const validate = (req, res, next) => {
    let error = '';
    if(req.body.name.trim() === '' || req.body.email.trim() === '' || req.body.password.trim() === '') {
        error = 'All fields are required';
        res.status(400).json({error});
        return;
    }
    else if(req.body.name.trim().length < 3){
        error = 'Name must be at least 3 characters long';
        res.status(400).json({error});
        return;
    } 
    else if(req.body.password.trim().length < 7) {
        error = 'Password must be at least 7 characters long';
        res.status(400).json({error});
        return;
    }
    else if(!(/(\S+)(@)(\S+)([.])(\S+)/).test(req.body.email)) {
        error = 'Enter a valid email address';
        res.status(400).json({error});
        return;
    }
    next();
}

export default validate;
