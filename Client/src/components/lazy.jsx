import React from "react";

// Route Components
export const Home = React.lazy(() => import("./Routes/Home"));
export const Signup = React.lazy(() => import("./Routes/Signup"));
export const Login = React.lazy(() => import("./Routes/Login"));
export const Dashboard = React.lazy(() => import("./Routes/Dashboard"));
export const StudyRoom = React.lazy(() => import("./Routes/StudyRoom"));
export const Leaderboard = React.lazy(() => import("./Routes/Leaderboard"));
export const StudyGoals = React.lazy(() => import("./Routes/StudyGoals"));
export const Settings = React.lazy(() => import("./Routes/Settings"));

// Settings Components
export const ProfileSettings = React.lazy(() =>
  import("./Settings/ProfileSettings")
);
export const EmailSettings = React.lazy(() =>
  import("./Settings/EmailSettings")
);
export const SecuritySettings = React.lazy(() =>
  import("./Settings/SecuritySettings")
);
export const LanguageSettings = React.lazy(() =>
  import("./Settings/LanguageSettings")
);

// UI Components
export const PreLoader = React.lazy(() => import("./ui/PreLoader"));
export const Button = React.lazy(() => import("./ui/Button"));
export const Loader = React.lazy(() => import("./ui/Loader"));

// Other Components
export const KeyStats = React.lazy(() => import("./KeyStats"));
export const Header = React.lazy(() => import("./Header"));
export const Dropdown = React.lazy(() => import("./Dropdown"));
export const Reveal = React.lazy(() => import("./Reveal"));
