const { ApolloError } = require("apollo-server");
const stringToJSON = require("../jsonProvider/parse");
const { header, footer } = require("./common");

const inviteTemplate = (p) => {
//   const obj = stringToJSON(p);

  const obj = p;
  const html = `${header}
    <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row"
            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

            <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #ffffff;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
            <div class="u-col u-col-100"
                style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                <div style="background-color: #ffffff;width: 100% !important;">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                    style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                    <!--<![endif]-->

                    <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0"
                    cellspacing="0" width="100%" border="0">
                    <tbody>
                        <tr>
                        <td
                            style="overflow-wrap:break-word;word-break:break-word;padding:22px 10px;font-family:'Raleway',sans-serif;"
                            align="left">

                            <h1
                            style="margin: 0px; color: #15578a; line-height: 140%; text-align: center; word-wrap: break-word; font-weight: normal; font-family: arial,helvetica,sans-serif; font-size: 22px;">
                            <strong>We are so excited to welcome you !</strong>
                            </h1>

                        </td>
                        </tr>
                    </tbody>
                    </table>

                    <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
        </div>
    </div>



    <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row"
            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: transparent;"><![endif]-->

            <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color: #fdfdfd;width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
            <div class="u-col u-col-100"
                style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                <div style="background-color: #fdfdfd;width: 100% !important;">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                    style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                    <!--<![endif]-->

                    <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0"
                    cellspacing="0" width="100%" border="0">
                    <tbody>
                        <tr>
                        <td
                            style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 10px 40px;font-family:'Raleway',sans-serif;"
                            align="left">

                            <div align="center">
                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;font-family:'Raleway',sans-serif;"><tr><td style="font-family:'Raleway',sans-serif;" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${obj.url}" style="height:50px; v-text-anchor:middle; width:256px;" arcsize="80%" stroke="f" fillcolor="#15578a"><w:anchorlock/><center style="color:#ffffff;font-family:'Raleway',sans-serif;"><![endif]-->
                            <a href="${obj.url}" target="_blank"
                                style="box-sizing: border-box;display: inline-block;font-family:'Raleway',sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #ffffff; background-color: #15578a; border-radius: 40px; -webkit-border-radius: 40px; -moz-border-radius: 40px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;">
                                <span style="display:block;padding:14px 55px;line-height:120%;"><span
                                    style="font-size: 18px; line-height: 21.6px;"><strong><span
                                        style="line-height: 21.6px; font-size: 18px;">Accept
                                        Invitation</span></strong></span></span>
                            </a>
                            <!--[if mso]></center></v:roundrect></td></tr></table><![endif]-->
                            </div>

                        </td>
                        </tr>
                    </tbody>
                    </table>

                    <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
        </div>
    </div>



    <div class="u-row-container" style="padding: 0px;background-color: transparent">
        <div class="u-row"
            style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #f9f9f9;">
            <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
            <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: transparent;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #f9f9f9;"><![endif]-->

            <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 30px 30px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
            <div class="u-col u-col-100"
                style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                <div style="width: 100% !important;">
                <!--[if (!mso)&(!IE)]><!-->
                <div
                    style="padding: 30px 30px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                    <!--<![endif]-->

                    <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0"
                    cellspacing="0" width="100%" border="0">
                    <tbody>
                        <tr>
                        <td
                            style="overflow-wrap:break-word;word-break:break-word;padding:20px 10px 0px;font-family:'Raleway',sans-serif;"
                            align="left">

                            <div style="color: #15578a; line-height: 140%; text-align: left; word-wrap: break-word;">
                            <p style="font-size: 14px; line-height: 140%; text-align: center;"><span
                                style="font-size: 24px; line-height: 33.6px;"><strong><span
                                    style="line-height: 33.6px; font-size: 24px;">${obj.inviter} has invited
                                    you<br /></span></strong></span></p>
                            </div>

                        </td>
                        </tr>
                    </tbody>
                    </table>

                    <table style="font-family:'Raleway',sans-serif;" role="presentation" cellpadding="0"
                    cellspacing="0" width="100%" border="0">
                    <tbody>
                        <tr>
                        <td
                            style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:'Raleway',sans-serif;"
                            align="left">

                            <div style="color: #868990; line-height: 170%; text-align: left; word-wrap: break-word;">
                            <p style="font-size: 14px; line-height: 170%; text-align: center;"><span
                                style="font-size: 16px; line-height: 27.2px;">${obj.inviter} (${obj.by}) would like to invite
                                you to the all new Medical Interface. This email is intended for ${obj.newAccount} (${obj.for}).<br /></span></p>
                            <p style="font-size: 14px; line-height: 170%; text-align: center;">&nbsp;</p>
                            </div>

                        </td>
                        </tr>
                    </tbody>
                    </table>

                    <!--[if (!mso)&(!IE)]><!-->
                </div>
                <!--<![endif]-->
                </div>
            </div>
            <!--[if (mso)|(IE)]></td><![endif]-->
            <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
            </div>
        </div>
    </div>
    
    ${footer}`;

  return html;
};

module.exports = inviteTemplate;
