📚 Planify
Planify is a productivity web application designed to help users stay focused and build consistent study habits. Users can join focus rooms, set goals, run timers, and track progress — all within a customizable and distraction-free interface.

🚀 Features
👤 User
Register and login (via Laravel Sanctum)

Join or create a focus room

Customize focus room with background and sound

Start / pause / end timers

Set and track personal study goals

View study statistics

View leaderboard rankings

Receive real-time notifications

🛠️ Admin
Access admin dashboard

Manage users and rooms

Upload / remove backgrounds and sounds

View platform-wide statistics

Send announcements to users

🧰 Tech Stack
Layer	Technology
Frontend	React.js
Backend	Laravel 11
Auth	Laravel Sanctum
Realtime	Laravel Echo + Pusher / Socket.io
Database	MySQL
Notifications	Laravel Notifications

⚙️ Installation
📦 Backend (Laravel)
bash
Copy
Edit
git clone https://github.com/Mohammedali03/Planify.git
cd Planify/server

cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed

php artisan serve
🌐 Frontend (React)
bash
Copy
Edit
cd ../client
npm install
npm run dev
🛡️ Authentication & Roles
Authentication is handled with Laravel Sanctum

Admin role is manually assigned (via database or seeder)

Access control is enforced with middleware, gates, and policies

🗂️ Folder Structure
csharp
Copy
Edit
Planify/
│
├── server/          # Laravel backend
│   ├── app/
│   ├── routes/
│   └── ...
│
├── client/          # React frontend
│   ├── src/
│   ├── public/
│   └── ...
🧪 Testing
bash
Copy
Edit
php artisan test       # Laravel tests
npm run test           # React tests (if available)
📈 Future Features
Pomodoro mode



Group study rooms

Mobile app (React Native or Flutter)

Chat and messaging (coming soon)

📄 License
MIT
