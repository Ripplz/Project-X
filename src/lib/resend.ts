import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendWelcomeEmail = async (email: string) => {
    return resend.emails.send({
        from: 'Bea Films <hello@beafilms.com>',
        to: email,
        subject: 'Welcome to Bea Films',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="color-scheme" content="light">
    <meta name="supported-color-schemes" content="light">
    <title>Welcome to Bea</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Parkinsans:wght@300..800&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet">
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Geist&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Parkinsans&display=swap');
    
        :root {
            color-scheme: light;
            supported-color-schemes: light;
        }
        
        /* Reset styles */
        body, html {
            margin: 0;
            padding: 0;
            width: 100% !important;
            height: 100% !important;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            font-family: 'Parkinsans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
        }
        
        * {
            -ms-text-size-adjust: 100%;
            -webkit-text-size-adjust: 100%;
        }
        
        div[style*="margin: 16px 0"] {
            margin: 0 !important;
        }
        
        table, td {
            mso-table-lspace: 0pt !important;
            mso-table-rspace: 0pt !important;
        }
        
        table {
            border-spacing: 0 !important;
            border-collapse: collapse !important;
            table-layout: fixed !important;
            margin: 0 auto !important;
        }
        
        img {
            -ms-interpolation-mode: bicubic;
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }
        
        /* Base styles */
        body {
            background-color: #F3F3F3;
            font-family: 'Parkinsans', Arial, sans-serif;
            line-height: 1.5;
            color: #333;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
        }
        
        .header {
            padding: 20px;
            text-align: center;
        }
        
        .logo {
            width: 120px;
            height: auto;
            display: block;
            margin: 0 auto;
        }
        
        .banner {
            background-color: #1a1a1a;
            color: #ffffff;
            padding: 24px;
            text-align: center;
        }
        
        .banner h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 600;
            font-family: 'Parkinsans', Arial, sans-serif;
        }
        
        .content {
            padding: 32px 24px;
        }
        
        .content p {
            margin: 0 0 24px;
            color: #666666;
            font-size: 16px;
        }
        
        .whats-next {
            margin: 32px 0;
        }
        
        .whats-next h2 {
            font-size: 18px;
            margin: 0 0 16px;
            color: #333333;
            font-family: 'Parkinsans', Arial, sans-serif;
        }
        
        .whats-next ul {
            margin: 0;
            padding: 0 0 0 20px;
            color: #666666;
        }
        
        .whats-next li {
            margin-bottom: 12px;
        }
        
        .cta-button {
            display: inline-block;
            background-color: #1a1a1a;
            color: #ffffff !important;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 999px;
            font-family: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            font-weight: 500;
            margin: 8px 0;
            mso-padding-alt: 0;
            text-underline-color: #1a1a1a;
            background-image: none;
        }
        
        [data-ogsc] .cta-button {
            background-color: #1a1a1a !important;
        }
        
        .signature {
            margin-top: 32px;
            color: #666666;
        }
        
        .footer {
            text-align: center;
            padding: 24px;
            background-color: #f8f8f8;
            color: #666666;
            font-size: 14px;
        }
        
        .social-links {
            margin-top: 16px;
        }
        
        .social-links a {
            display: inline-block;
            margin: 0 2px;
        }
        
        @media (prefers-color-scheme: dark) {
            .email-container {
                background-color: #ffffff !important;
            }
            body, .body {
                background-color: #F3F3F3 !important;
            }
            .content p, .whats-next ul, .footer {
                color: #666666 !important;
            }
            .banner h1, .whats-next h2 {
                color: #333333 !important;
                font-family: 'Parkinsans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;

            }
        }
        
        @media screen and (max-width: 600px) {
            .email-container {
                width: 100% !important;
                margin: 10px auto !important;
            }
            .content {
                padding: 20px 16px !important;
            }
            .banner h1 {
                font-size: 24px !important;
            }
        }
    </style>
</head>
<body>
    <!--[if mso]>
    <div style="background-color: #F3F3F3;">
    <![endif]-->
    <div class="email-container">
        <header class="header">
            <img src="https://ztulhrgtbmhhkjjqlxnx.supabase.co/storage/v1/object/public/assets/Bea%20films.png" alt="Bea Films Logo" class="logo" />
        </header>
        <div class="banner">
            <h1>Welcome to Bea</h1>
        </div>
        <main class="content">
            <p>Hello, you!</p>
            <p>We're building a virtual cinema where you can experience exclusive theatrical releases—from blockbusters to indie gems—wherever you are. No subscriptions. No endless scrolling. Just incredible films you can't catch at your local theater.</p>
            <div class="whats-next">
                <h2>What's next?</h2>
                <ul>
                    <li>We'll keep you updated as we gear up for launch.</li>
                    <li>Expect early access to special screenings and behind-the-scenes updates.</li>
                </ul>
            </div>
            <p>In the meantime, tell your friends—great movies are better shared.</p>
            <!--[if mso]>
            <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" style="height:40px;v-text-anchor:middle;width:200px;" arcsize="50%" stroke="f" fillcolor="#1a1a1a">
            <w:anchorlock/>
            <center>
            <![endif]-->
            <a href="#" class="cta-button">Share the waitlist</a>
            <!--[if mso]>
            </center>
            </v:roundrect>
            <![endif]-->
            <div class="signature">
                <p>Cheers,<br>The Bea team</p>
            </div>
        </main>
        <footer class="footer">
            <p>With ❤️ from Bea</p>
            <p>PLZ. Ort, Telefon, Ahmad Dahlan, Max<br>Planckstr. 2 / 7505, 64807</p>
            <div class="social-links">
                <a href="https://www.beafilms.com" aria-label="Website"><img src="https://ztulhrgtbmhhkjjqlxnx.supabase.co/storage/v1/object/public/assets/beafilms_website_icon.png?t=2025-01-11T11%3A09%3A54.653Z" alt="Bea Films" class="logo" style="width: 32px; height: 32px;" /></a>
                <a href="#" aria-label="Twitter"><img src="https://ztulhrgtbmhhkjjqlxnx.supabase.co/storage/v1/object/public/assets/beafilms_twitter_icon.png?t=2025-01-11T11%3A09%3A22.913Z" alt="Bea Films Twitter" class="logo" style="width: 32px; height: 32px;" /></a>
                <a href="#" aria-label="Instagram"><img src="https://ztulhrgtbmhhkjjqlxnx.supabase.co/storage/v1/object/public/assets/beafilms_instagram_icon.png?t=2025-01-11T11%3A08%3A12.634Z" alt="Bea Films Instagram" class="logo" style="width: 32px; height: 32px;" /></a>
                <a href="#" aria-label="TikTok"><img src="https://ztulhrgtbmhhkjjqlxnx.supabase.co/storage/v1/object/public/assets/beafilms_tiktok_icon.png?t=2025-01-11T11%3A09%3A06.448Z?t=2025-01-11T10%3A15%3A49.410Z" alt="Bea Films Tiktok" class="logo" style="width: 32px; height: 32px;" /></a>
            </div>
        </footer>
    </div>
    <!--[if mso]>
    </div>
    <![endif]-->
</body>
</html>`
    });
};
