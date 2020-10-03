
const create =async (user)=>{
    try
    {
        let response=await fetch('/api/users/',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)
        });

        return await response.json();
        
    }
    catch(err)
    {
        console.log(err);
    }
}

const list=async (signal)=>{
    try{
        let response=await fetch('/api/users/',{
            method:'GET',
            signal:signal
        });

        return await response.json();
    }
    catch(err)
    {
        console.log(err);
    }
}

const read=async (params,credentials,signal)=>{
   // console.log(params,credentials);
    try
    {
        let response=await fetch('/api/users/'+params.userId,{
            method:'GET',
            signal:signal,
            headers:{'Content-Type':'application/json',
            'Accept':'application/json',
            'Authorization':'Bearer '+credentials.t
        }
        })

        return await response.json();
    }
    catch(err)
    {
        console.log(err);
    }
}

const update=async (params,credentials,user)=>{
    try{
        let response=await fetch('/api/users/'+params.userId,{
            method:'PUT',
            headers:{'Content-Type':'application/json',
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Bearer '+credentials.t
            },
            body:JSON.stringify(user)
        });

        return await response.json();
    }
    catch(err)
    {
        console.log(err);
    }
}

const remove=async (params,credentials)=>{
    try
    {
        let response=await fetch('/api/users/'+params.userId,{
            method:'DELETE',
            headers:{'Content-Type':'application/json',
            'Accept':'application/json',
            'Content-Type':'application/json',
            'Authorization':'Bearer '+credentials.t    
        }
        });

        return await response.json();
    }
    catch(err)
    {
        console.log(err);
    }
}

export {create,list,read,update,remove};