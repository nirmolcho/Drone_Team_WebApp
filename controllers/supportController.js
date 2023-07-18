const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const supportView = async (req, res) => {
    
    res.render('support', {
    
        status: ''
    });
}

const contactSend = async (req, res) => {
    const msg = {
        to: 'DroneTeamRecive@gmail.com',
        from: 'dronteamsend@gmail.com',
        subject: 'Support',
        text: 'Plain text body of your email',
        html: `<p>${req.body.content}</p>`,
    };
    try {
        await sgMail.send(msg);
        res.send({ status: 'success', message: 'message sent'});
    } catch (error) {
        res.send({ status: 'error', message: error.response.body.errors[0].message});
    } 
}

module.exports = {
    supportView,
    contactSend
}