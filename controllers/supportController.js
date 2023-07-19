const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const supportView = async (req, res) => {
    
    res.render('support', {
    
        status: ''
    });
}

const contactSend = async (req, res) => {
    const msg = {
        from: 'dronteamsend@gmail.com',
        to: 'droneteamrecive@gmail.com',
        subject: 'Support',
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