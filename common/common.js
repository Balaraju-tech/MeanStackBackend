
const use = (funct)=> {
    return  (req,res,next)=>{
        return Promise.resolve(funct(req,res,next)).catch(next);
    };
};


module.exports= {use};