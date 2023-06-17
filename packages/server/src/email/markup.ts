/**
 * Email markup template
 */
export const markup = {
  login: (code: string) =>
    `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <html lang="en">
    <body data-id="__react-email-body" style="background-color:#ffffff">
      <table align="center" width="100%" data-id="__react-email-container" role="presentation" cellSpacing="0" cellPadding="0" border="0" style="max-width:37.5em;padding-left:12px;padding-right:12px;margin:0 auto">
        <tbody>
          <tr style="width:100%">
            <td>
              <h1 data-id="react-email-heading" style="color:#333;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:28px;font-weight:bold;margin:40px 0;padding:0">Login</h1><a href="https://spotlight.d-exclaimation.me/magic-link?code=${code}" data-id="react-email-link" target="_blank" style="color:#2754C5;text-decoration:underline;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:14px;display:block;margin-bottom:16px">Click here to log in with this magic link</a>
              <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:24px 0;color:#8B94AD;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin-bottom:14px">Or, copy and paste this temporary login code:</p><code style="display:inline-block;padding:16px 4.5%;width:90.5%;background-color:#f4f4f4;border-radius:5px;border:1px solid #eee;color:#333;font-size:20px">${code}</code>
              <p data-id="react-email-text" style="font-size:14px;line-height:24px;margin:24px 0;color:#8B94AD;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin-top:14px;margin-bottom:16px">If you didn&#x27;t try to login, you can safely ignore this email.</p><img data-id="react-email-img" alt="Spotlight&#x27;s Logo" src="https://spotlight.d-exclaimation.me/spotlight-app.png" width="32" height="32" style="display:block;outline:none;border:none;text-decoration:none" />
              <p data-id="react-email-text" style="font-size:12px;line-height:22px;margin:16px 0;color:#8B94ADAA;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin-top:12px;margin-bottom:24px"><a href="https://spotlight.d-exclaimation.me" data-id="react-email-link" target="_blank" style="color:#7BA0FF;text-decoration:underline;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:14px">Spotlight</a>,<br />Browsing news streamlined</p>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
    `.trim(),
  welcome: `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <html lang="en">
    <body data-id="__react-email-body" style="background-color:#ffffff">
      <table align="center" width="100%" data-id="__react-email-container" role="presentation" cellSpacing="0" cellPadding="0" border="0" style="max-width:37.5em;padding-left:12px;padding-right:12px;margin:0 auto">
        <tbody>
          <tr style="width:100%">
            <td><img data-id="react-email-img" alt="Spotlight&#x27;s Logo" src="https://spotlight.d-exclaimation.me/spotlight-app.png" width="48" height="48" style="display:block;outline:none;border:none;text-decoration:none;margin:40px 0" /><img data-id="react-email-img" alt="Welcome Spotlight" src="https://spotlight.d-exclaimation.me/banner/welcome.png" width="100%" style="display:block;outline:none;border:none;text-decoration:none;border-radius:5px" />
              <p data-id="react-email-text" style="font-size:16px;line-height:24px;margin:24px 0;color:#8B94AD;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin-bottom:14px">Welcome to Spotlight!</p>
              <p data-id="react-email-text" style="font-size:16px;line-height:24px;margin:24px 0;color:#8B94AD;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin-bottom:14px">Your account has been created and you can now log into Spotlight.</p>
              <p data-id="react-email-text" style="font-size:16px;line-height:24px;margin:24px 0;color:#8B94AD;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin-top:24px;margin-bottom:16px">We believe in a better way to read the news.<br />One that is a breeze, not a chore.<br />Long gone are the days of cluttered news sites.<br />Time to put the Spotlight on what matters.</p>
              <p data-id="react-email-text" style="font-size:16px;line-height:24px;margin:24px 0;color:#8B94AD;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin-top:40px;margin-bottom:14px">Have fun reading,<br /> Friends at Spotlight</p><img data-id="react-email-img" alt="Spotlight&#x27;s Logo" src="https://spotlight.d-exclaimation.me/spotlight-app.png" width="32" height="32" style="display:block;outline:none;border:none;text-decoration:none" />
              <p data-id="react-email-text" style="font-size:12px;line-height:22px;margin:16px 0;color:#8B94ADAA;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;margin-top:12px;margin-bottom:24px"><a href="https://spotlight.d-exclaimation.me" data-id="react-email-link" target="_blank" style="color:#7BA0FF;text-decoration:underline;font-family:-apple-system, BlinkMacSystemFont, &#x27;Segoe UI&#x27;, &#x27;Roboto&#x27;, &#x27;Oxygen&#x27;, &#x27;Ubuntu&#x27;, &#x27;Cantarell&#x27;, &#x27;Fira Sans&#x27;, &#x27;Droid Sans&#x27;, &#x27;Helvetica Neue&#x27;, sans-serif;font-size:14px">Spotlight</a>,<br />Browsing news streamlined</p>
            </td>
          </tr>
        </tbody>
      </table>
    </body>
  </html>
    `.trim(),
};
