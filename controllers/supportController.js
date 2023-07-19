const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API);

const supportView = async (req, res) => {
    
    res.render('support', {
    
        status: ''
    });
}

const contactSend = async (req, res) => {
    const msg = {
        from: 'dronteamsend@gmail.com',
        to: 'droneteamrecive@gmail.com',
        subject: 'Drone Team Support Ticket',
        text: 'Plain text body of your email',
        html: `<p>${req.body.content}</p>`,
    };
    sgMail.send(msg)
        .then(() => {
            console.log('Email sent');
        })
        .catch((error) => {
            console.error(error);
        });
    res.render('support', {
        status: ''
    });
}

module.exports = {
    supportView,
    contactSend
}