import express from 'express'
import path from 'path'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template';

import UserRoute from './routes/user.routes';

import AuthRoute from './routes/auth.routes';

//FOR SERVER SIDE RENDERING
// 1.The following modules are required to render the React components and use renderToString :
import React from 'react';
import ReactDOMServer from 'react-dom/server';
/*2. staticRouter is a stateless router that takes the
requested URL to match with the frontend route which was declared in the
MainRouter component. The MainRouter is the root component in our
frontend. */
import StaticRouter from 'react-router-dom/StaticRouter';
import MainRouter from './../client/MainRouter';

/*3.The following modules will
help generate the CSS styles for the frontend components based on the
stylings and Material-UI theme that are used on the frontend: */
import {ServerStyleSheets,ThemeProvider} from '@material-ui/styles';
import theme from './../client/theme';
//end

//comment out before building for production
import devBundle from './devBundle'

const CURRENT_WORKING_DIR = process.cwd()
const app = express()

//comment out before building for production
devBundle.compile(app)

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
app.use(helmet())
// enable CORS - Cross Origin Resource Sharing
app.use(cors())

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

app.use('/',UserRoute);
app.use('/',AuthRoute);


app.get('*',(req,res)=>{
  const sheets=new ServerStyleSheets();
  const context={};
  const markup=ReactDOMServer.renderToString(
    sheets.collect(
      <StaticRouter location={req.url} context={context}>
        <ThemeProvider theme={theme}>
            <MainRouter/>
        </ThemeProvider>
      </StaticRouter>
    )
  );
  
  if(context.url)
      return res.redirect(303,context.url)
  const css=sheets.toString();

  res.status(200).send(Template({
    markup:markup,
    css:css
  }));
})
//catch error thrown by express-jwt
app.use((err,req,res,next)=>{
  if(err.name == 'UnauthorizedError')
    res.status('401').json({"error":err.name+" : "+err.message});
  
  else if(err)
  {
    res.status('400').json({"error":err.name+" : "+err.message});
    console.log(err);
  }
})


export default app
