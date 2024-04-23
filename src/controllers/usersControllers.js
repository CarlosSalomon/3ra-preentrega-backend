import passport from "passport";

class usersControllers {
    
    static home = async (req, res) =>{
        res.render('home')
    }
    static chat = async (req, res) =>{
        res.render('chat')
    }
    static login = async (req, res) =>{
        res.render('login')
    }
    static logout = async (req, res) =>{
        req.session.destroy((err) => {
            if (err) res.send('Failed Logout')
            res.redirect('/')
        })
    }
    static register = async (req, res) =>{
        res.render('register')
    }
    static failLogin = async (req, res) =>{
        res.send({error:"Failed login Strategy"})
    }
    
    static failedregister = async (req, res) =>{
        res.send({error:"Failed Strategy"})
    }
    static registerOk =  async (req, res)=>{
        res.redirect('/login')
    }
    
    static logindb = async (req,res,next) => {
        passport.authenticate('login', async (err, user, info) => {
            try {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.render('login', { error: "credenciales invalidas" });
                }
                req.login(user, async (loginErr) => {
                    if (loginErr) {
                        return next(loginErr);
                    }
                req.session.user = {
                    email: user.email,
                    name: user.first_name,
                    age: user.age,
                    lastname: user.last_name,
                };
                return res.redirect('/productos')
                // return res.send({ status: "success", message: "Login successful" });
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
}

}

export {usersControllers}
