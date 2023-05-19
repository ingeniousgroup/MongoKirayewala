import nodemailer from 'nodemailer';
function email(email,subject,name,otp){
    console.log("Inside the email");
    var transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      service: 'gmail',
      port: 465,
      secure: true,
      auth: {
        user: 'rajputmohit2134@gmail.com',
        pass: 'drxyrqbrxikerqfn'
      }
    });
    var mailOptions = {
      from: 'rajputmohit2134@gmail.com',
      to: email,
      subject: subject,
      text:" Welcome "+name +" in a Kirayewala application hope you enjoying our services\nThis is your otp number "+otp
    };
    transporter.sendMail(mailOptions, function (error, info){
        console.log("Email has sent");
        error ? console.log(error):response.send("Email has been sent to the user")
    });
    return true;
}
export default email;