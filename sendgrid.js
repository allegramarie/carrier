const axios = require("axios");
const config = require("./config.js");

let sendGrid = (req, res) => {
  console.log("inside sendgrid function", `${config.TOKEN}`);
  return axios({
    method: "post",
    url: "https://api.sendgrid.com/v3/mail/send",
    headers: {
      Authorization: `Bearer ${config.TOKEN}`,
      "Content-Type": "application/json"
    },
    data: {
      personalizations: [
        {
          to: [
            {
              email: "allegra.berndt@gmail.com",
              name: "John Doe"
            },
            {
              email: "jieningjchen@gmail.com",
              name: "John Doe"
            },
            {
              email: "adammateo@gmail.com",
              name: "John Doe"
            },
            {
              email: "christopher.rigoli@gmail.com",
              name: "John Doe"
            },
            {
              email: "rileyalsman@gmail.com",
              name: "John Doe"
            },
            {
              email: "juangalan.a.s@gmail.com",
              name: "John Doe"
            },
            {
              email: " sin11eric@gmail.com",
              name: "John Doe"
            },
            {
              email: "manolaki@gmail.com",
              name: "John Doe"
            },
            {
              email: "qisforq@gmail.com",
              name: "John Doe"
            },
            {
              email: "aalexlevine@gmail.com",
              name: "John Doe"
            },
            {
              email: "brent.timothy.hagen@gmail.com",
              name: "John Doe"
            },
            {
              email: "rory.eagan@gmail.com",
              name: "John Doe"
            }
          ],
          subject: "Hello, World!"
        }
      ],
      from: {
        email: "allegra.berndt@gmail.com",
        name: "Sam Smith"
      },
      reply_to: {
        email: "allegra.berndt@gmail.com",
        name: "Sam Smith"
      },
      subject: "Hello, World!",
      content: [
        {
          type: "text/html",
          value:
            '<!DOCTYPE html><meta content="width=device-width"name=viewport><meta content="text/html; charset=UTF-8"http-equiv=Content-Type><title>Simple Transactional Email</title><style>img{border:none;-ms-interpolation-mode:bicubic;max-width:100%}body{background-color:#f6f6f6;font-family:sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}table{border-collapse:separate;mso-table-lspace:0;mso-table-rspace:0;width:100%}table td{font-family:sans-serif;font-size:14px;vertical-align:top}.body{background-color:#f6f6f6;width:100%}.container{display:block;Margin:0 auto!important;max-width:580px;padding:10px;width:580px}.content{box-sizing:border-box;display:block;Margin:0 auto;max-width:580px;padding:10px}.main{background:#fff;border-radius:3px;width:100%}.wrapper{box-sizing:border-box;padding:20px}.content-block{padding-bottom:10px;padding-top:10px}.footer{clear:both;Margin-top:10px;text-align:center;width:100%}.footer a,.footer p,.footer span,.footer td{color:#999;font-size:12px;text-align:center}h1,h2,h3,h4{color:#000;font-family:sans-serif;font-weight:400;line-height:1.4;margin:0;Margin-bottom:30px}h1{font-size:35px;font-weight:300;text-align:center;text-transform:capitalize}ol,p,ul{font-family:sans-serif;font-size:14px;font-weight:400;margin:0;Margin-bottom:15px}ol li,p li,ul li{list-style-position:inside;margin-left:5px}a{color:#3498db;text-decoration:underline}.btn{box-sizing:border-box;width:100%}.btn>tbody>tr>td{padding-bottom:15px}.btn table{width:auto}.btn table td{background-color:#fff;border-radius:5px;text-align:center}.btn a{background-color:#fff;border:solid 1px #3498db;border-radius:5px;box-sizing:border-box;color:#3498db;cursor:pointer;display:inline-block;font-size:14px;font-weight:700;margin:0;padding:12px 25px;text-decoration:none;text-transform:capitalize}.btn-primary table td{background-color:#3498db}.btn-primary a{background-color:#3498db;border-color:#3498db;color:#fff}.last{margin-bottom:0}.first{margin-top:0}.align-center{text-align:center}.align-right{text-align:right}.align-left{text-align:left}.clear{clear:both}.mt0{margin-top:0}.mb0{margin-bottom:0}.preheader{color:transparent;display:none;height:0;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;visibility:hidden;width:0}.powered-by a{text-decoration:none}hr{border:0;border-bottom:1px solid #f6f6f6;Margin:20px 0}@media only screen and (max-width:620px){table[class=body] h1{font-size:28px!important;margin-bottom:10px!important}table[class=body] a,table[class=body] ol,table[class=body] p,table[class=body] span,table[class=body] td,table[class=body] ul{font-size:16px!important}table[class=body] .article,table[class=body] .wrapper{padding:10px!important}table[class=body] .content{padding:0!important}table[class=body] .container{padding:0!important;width:100%!important}table[class=body] .main{border-left-width:0!important;border-radius:0!important;border-right-width:0!important}table[class=body] .btn table{width:100%!important}table[class=body] .btn a{width:100%!important}table[class=body] .img-responsive{height:auto!important;max-width:100%!important;width:auto!important}}@media all{.ExternalClass{width:100%}.ExternalClass,.ExternalClass div,.ExternalClass font,.ExternalClass p,.ExternalClass span,.ExternalClass td{line-height:100%}.apple-link a{color:inherit!important;font-family:inherit!important;font-size:inherit!important;font-weight:inherit!important;line-height:inherit!important;text-decoration:none!important}.btn-primary table td:hover{background-color:#34495e!important}.btn-primary a:hover{background-color:#34495e!important;border-color:#34495e!important}}</style><table border=0 cellpadding=0 cellspacing=0 class=body><tr><td>\u00A0<td class=container><div class=content><span class=preheader>This is preheader text. Some clients will show this text as a preview.</span><table class=main><tr><td class=wrapper><table border=0 cellpadding=0 cellspacing=0><tr><td><p>Hi there,<p>Sometimes you just want to send a simple HTML email with a simple design and clear call to action. This is it.<table border=0 cellpadding=0 cellspacing=0 class="btn btn-primary"><tr><td align=left><table border=0 cellpadding=0 cellspacing=0><tr><td><a href=http://htmlemail.io target=_blank>Call To Action</a></table></table><p>This is a really simple email template. Its sole purpose is to get the recipient to click the button with no distractions.<p>Good luck! Hope it works.</table></table><div class=footer><table border=0 cellpadding=0 cellspacing=0><tr><td class=content-block><span class=apple-link>Company Inc, 3 Abbey Road, San Francisco CA 94102</span><br>Don\'t like these emails? <a href=http://i.imgur.com/CScmqnj.gif>Unsubscribe</a>.<tr><td class="content-block powered-by">Powered by <a href=http://htmlemail.io>HTMLemail</a>.</table></div></div><td>\u00A0</table>'
        }
      ]
    }
  })
    .then(response => {
      console.log("Within sendgrid response", response);
    })
    .catch(error => {
      console.log("Within sendgrid error", error);
    });
};

module.exports = sendGrid;

//<!DOCTYPE html><html xmlns=http://www.w3.org/1999/xhtml xmlns:o=urn:schemas-microsoft-com:office:office xmlns:v=urn:schemas-microsoft-com:vml><title></title><meta content="IE=edge"http-equiv=X-UA-Compatible><meta content="text/html; charset=UTF-8"http-equiv=Content-Type><meta content="width=device-width,initial-scale=1"name=viewport><meta name=x-apple-disable-message-reformatting><style>#outlook a{padding:0}.ReadMsgBody{width:100%}.ExternalClass{width:100%}.ExternalClass *{line-height:100%}body{margin:0;padding:0;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{border-collapse:collapse;mso-table-lspace:0;mso-table-rspace:0}img{border:0;height:auto;line-height:100%;outline:0;text-decoration:none;-ms-interpolation-mode:bicubic}p,ul{display:block;margin:0}@media only screen and (min-width:480px){.email-col-17{width:17%!important}.email-col-25{width:25%!important}.email-col-33{width:33%!important}.email-col-50{width:50%!important}.email-col-67{width:67%!important}.email-col-100{width:100%!important}}@media only screen and (max-width:480px){img.fullwidth{max-width:100%!important}}</style><!--[if mso]><xml><o:officedocumentsettings><o:allowpng><o:pixelsperinch>96</o:pixelsperinch></o:officedocumentsettings></xml><![endif]--><!--[if lte mso 11]><style>.outlook-group-fix{width:100%!important}</style><![endif]--><body bgcolor=#ffffff class=u_body id=u_body style=margin:0;mso-line-height-rule:exactly;background-color:#fff width=100%><div style=background-color:#fff;font-family:arial,helvetica,sans-serif><table border=0 cellpadding=0 cellspacing=0 width=100% class=u_row id=u_row_2 align=center style=margin:0;padding:0><tr><td style=padding:10px;background-color:#fff align=center bgcolor=#ffffff valign=top><!--[if mso | IE]><table border=0 cellpadding=0 cellspacing=0 width=500 role=presentation align=center style=width:500px><tr><td style=line-height:0;font-size:0;mso-line-height-rule:exactly><![endif]--><div style="margin:0 auto;max-width:500px"><table border=0 cellpadding=0 cellspacing=0 role=presentation align=center style=font-size:0;width:100%><tr><td style=text-align:center;vertical-align:top;direction:ltr;font-size:0 bgcolor=""><!--[if mso | IE]><table border=0 cellpadding=0 cellspacing=0 role=presentation><tr><td style=vertical-align:top;width:500px><![endif]--><div style=vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100% class="outlook-group-fix u_column email-col-100"id=u_column_2><table border=0 cellpadding=0 cellspacing=0 width=100% class=u_content_text id=u_content_text_1 role=presentation><tr><td style=overflow-wrap:break-word;padding:10px align=left><div style=color:#000;line-height:120%;text-align:center;font-family:inherit><p style=font-size:14px;line-height:120%><span style=text-decoration:underline;font-size:14px;line-height:16.8px><span style="font-size:24px;line-height:28.8px;font-family:'comic sans ms',sans-serif"><strong>Welcome to RavenMail</strong></span></span></div></table><table border=0 cellpadding=0 cellspacing=0 width=100% class=u_content_divider id=u_content_divider_1 role=presentation><tr><td style=overflow-wrap:break-word;padding:10px align=left><div style=text-align:center><div style=border-top-width:1px;border-top-style:solid;border-top-color:#ccc;display:inline-block;width:100%;line-height:1px;font-size:1px;height:1px> </div></div></table></div><!--[if mso | IE]><![endif]--></table></div><!--[if mso | IE]><![endif]--></table><table border=0 cellpadding=0 cellspacing=0 width=100% class=u_row id=u_row_5 align=center style=margin:0;padding:0><tr><td style=padding:10px;background-color:rgba(255,255,255,0) align=center bgcolor=""valign=top><!--[if mso | IE]><table border=0 cellpadding=0 cellspacing=0 width=500 role=presentation align=center style=width:500px><tr><td style=line-height:0;font-size:0;mso-line-height-rule:exactly><![endif]--><div style="margin:0 auto;max-width:500px"><table border=0 cellpadding=0 cellspacing=0 role=presentation align=center style=font-size:0;width:100%><tr><td style=text-align:center;vertical-align:top;direction:ltr;font-size:0 bgcolor=""><!--[if mso | IE]><table border=0 cellpadding=0 cellspacing=0 role=presentation><tr><td style=vertical-align:top;width:125px><![endif]--><div style=vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100% class="outlook-group-fix u_column email-col-25"id=u_column_9><table border=0 cellpadding=0 cellspacing=0 width=100% class=u_content_image id=u_content_image_3 role=presentation><tr><td style=overflow-wrap:break-word;padding:0 align=left><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td style=padding-right:0;padding-left:0 align=center><img align=center alt=Image border=0 src=https://unroll-images-production.s3.amazonaws.com/projects/618/1521657017113-Screen%20Shot%202018-03-21%20at%202.28.06%20PM.png style=outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;clear:both;display:block!important;border:none;height:auto;float:none;width:100%;max-width:125px title=Image width=125 class=fullwidth></table></table></div><!--[if mso | IE]><td style=vertical-align:top;width:125px><![endif]--><div style=vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100% class="outlook-group-fix u_column email-col-25"id=u_column_10><table border=0 cellpadding=0 cellspacing=0 width=100% class=u_content_image id=u_content_image_4 role=presentation><tr><td style=overflow-wrap:break-word;padding:0 align=left><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td style=padding-right:0;padding-left:0 align=center><img align=center alt=Image border=0 src=https://unroll-images-production.s3.amazonaws.com/projects/618/1521657109134-Screen%20Shot%202018-03-21%20at%202.31.32%20PM.png style=outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;clear:both;display:block!important;border:none;height:auto;float:none;width:100%;max-width:125px title=Image width=125></table></table></div><!--[if mso | IE]><td style=vertical-align:top;width:125px><![endif]--><div style=vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100% class="outlook-group-fix u_column email-col-25"id=u_column_11><table border=0 cellpadding=0 cellspacing=0 width=100% class=u_content_image id=u_content_image_5 role=presentation><tr><td style=overflow-wrap:break-word;padding:0 align=left><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td style=padding-right:0;padding-left:0 align=center><img align=center alt=Image border=0 src=https://unroll-images-production.s3.amazonaws.com/projects/618/1521657219312-Screen%20Shot%202018-03-21%20at%202.31.32%20PM.png style=outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;clear:both;display:block!important;border:none;height:auto;float:none;width:100%;max-width:125px title=Image width=125></table></table></div><!--[if mso | IE]><td style=vertical-align:top;width:125px><![endif]--><div style=vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100% class="outlook-group-fix u_column email-col-25"id=u_column_12><table border=0 cellpadding=0 cellspacing=0 width=100% class=u_content_image id=u_content_image_6 role=presentation><tr><td style=overflow-wrap:break-word;padding:0 align=left><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td style=padding-right:0;padding-left:0 align=center><img align=center alt=Image border=0 src=https://unroll-images-production.s3.amazonaws.com/projects/618/1521657058179-Screen%20Shot%202018-03-21%20at%202.28.06%20PM.png style=outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;clear:both;display:block!important;border:none;height:auto;float:none;width:100%;max-width:125px title=Image width=125></table></table></div><!--[if mso | IE]><![endif]--></table></div><!--[if mso | IE]><![endif]--></table><table border=0 cellpadding=0 cellspacing=0 width=100% class=u_row id=u_row_1 align=center style=margin:0;padding:0><tr><td style=padding:10px;background-color:#fff align=center bgcolor=#ffffff valign=top><!--[if mso | IE]><table border=0 cellpadding=0 cellspacing=0 width=500 role=presentation align=center style=width:500px><tr><td style=line-height:0;font-size:0;mso-line-height-rule:exactly><![endif]--><div style="margin:0 auto;max-width:500px"><table border=0 cellpadding=0 cellspacing=0 role=presentation align=center style=font-size:0;width:100%><tr><td style=text-align:center;vertical-align:top;direction:ltr;font-size:0 bgcolor=""><!--[if mso | IE]><table border=0 cellpadding=0 cellspacing=0 role=presentation><tr><td style=vertical-align:top;width:500px><![endif]--><div style=vertical-align:top;display:inline-block;direction:ltr;font-size:13px;text-align:left;width:100% class="outlook-group-fix u_column email-col-100"id=u_column_1><table border=0 cellpadding=0 cellspacing=0 width=100% class=u_content_image id=u_content_image_1 role=presentation><tr><td style=overflow-wrap:break-word;padding:10px align=left><table border=0 cellpadding=0 cellspacing=0 width=100%><tr><td style=padding-right:0;padding-left:0 align=center><img align=center alt=Image border=0 src=https://unroll-images-production.s3.amazonaws.com/projects/618/1521655526096-drags.jpg style=outline:0;text-decoration:none;-ms-interpolation-mode:bicubic;clear:both;display:block!important;border:none;height:auto;float:none;width:100%;max-width:236px title=Image width=236></table></table><table border=0 cellpadding=0 cellspacing=0 width=100% class=u_content_text id=u_content_text_2 role=presentation><tr><td style=overflow-wrap:break-word;padding:10px align=left><div style=color:#000;line-height:120%;text-align:left;font-family:inherit><p style=line-height:120%;font-size:14px>Lorem ipsum dolor sit amet, vix partem intellegat at, quis agam mediocritatem cum et. Ei cum melius definiebas, sint audiam dignissim eu mea, invenire comprehensam sit et. Alienum nostrum dissentiunt ex nec. Eum id everti deseruisse.bbnkjnj<p style=line-height:120%;font-size:14px> <p style=line-height:120%;font-size:14px>Id nam veritus invenire pericula. Hinc ceteros incorrupte est ne, cum utinam option et, et eam doctus quaerendum. Vel evertitur conceptam et, pro volumus patrioque cu, cum cu dicta accusam interpretaris. Agam oporteat definitionem sit an, in per mundi albucius hendrerit, suas tollit quidam pri id.<p style=line-height:120%;font-size:14px> <p style=line-height:120%;font-size:14px>Pri in liberavisse delicatissimi, mei tritani tincidunt ut, ex mei vitae periculis. Cu graeci interpretaris pri, per meliore fuisset ut, mutat perpetua id his. Splendide ullamcorper comprehensam has ex, id sea ubique putent. Facer inermis pro at, altera iisque ex vel. No commune referrentur nec. Mel placerat antiopam no.<p style=line-height:120%;font-size:14px> <p style=line-height:120%;font-size:14px>In vel quas illud. Has natum tation id, ei utamur interpretaris vix. Eu usu mollis quaeque nusquam, ex eam dico exerci doctus, pro ut modo regione percipit. Ipsum idque dicunt an mel, ea legendos sensibus cotidieque mei.<p style=line-height:120%;font-size:14px> <p style=line-height:120%;font-size:14px>Nec ullum contentiones ei. Zril fastidii ea vix, fugit summo oblique nam te. Dolore verterem oportere mel in, integre conclusionemque pri eu, no dissentias accommodare est. An mea lorem antiopam assentior, duis alterum deseruisse cum cu. Pro eu graece intellegat, ius te commodo graecis. Modo principes adversarium pro an.</div></table></div><!--[if mso | IE]><![endif]--></table></div><!--[if mso | IE]><![endif]--></table></div>
