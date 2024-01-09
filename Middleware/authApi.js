const AUTHKEY = "TARANG"

const auth = (req,res,next) => {
    try {

        if (req.headers.authorization === AUTHKEY){

            next();
        } else {
            console.log(req.headers.authorization);
            console.log(AUTHKEY);
            res.status(412).send("Auth key Invalid")
        }
    } catch {
        res.status(401).json(
            {error : new Error('Invalid Request')}
        )
    }
}

module.exports = auth