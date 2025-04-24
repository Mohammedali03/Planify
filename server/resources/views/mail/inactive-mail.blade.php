<!DOCTYPE html>
<html>
<head>
    <title>We miss you!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid #eee;
        }
        .content {
            padding: 25px 0;
        }
        .footer {
            text-align: center;
            font-size: 0.8em;
            color: #777;
            border-top: 1px solid #eee;
            padding-top: 20px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4CAF50;
            color: white !important;
            text-decoration: none;
            border-radius: 4px;
            margin: 20px 0;
            font-weight: bold;
        }
        .features {
            margin: 20px 0;
        }
        .feature-item {
            margin-bottom: 10px;
            padding-left: 10px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h2>{{ config('app.name') }}</h2>
    </div>

    <div class="content">
        <h3>We miss you, {{ $name }}! 🎉</h3>
        
        <p>We noticed you haven't visited {{ config('app.name') }} lately. Here's what you're missing:</p>
        
        <div class="features">
            <div class="feature-item">🎯 <strong>Set and track your goals</strong></div>
            <div class="feature-item">🧘 <strong>Join focus rooms</strong></div>
            <div class="feature-item">🏆 <strong>Compete on leaderboards</strong></div>
            <div class="feature-item">💬 <strong>Chat with others who are grinding like you</strong></div>
        </div>

        <center>
            <a href="{{ config('app.frontend_url') }}" class="button">Continue Studying Now</a>
        </center>
    </div>

    <div class="footer">
        <p>© {{ date('Y') }} {{ config('app.name') }}. All rights reserved.</p>
       
    </div>
</body>
</html>