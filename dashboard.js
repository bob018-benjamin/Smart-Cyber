<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>User Dashboard - Smart Cyber</title>
  <link rel="stylesheet" href="dashboard.css" />
</head>
<body>
  <header>
    <div class="logo">
      <img src="images/logo.png" alt="Smart Cyber Logo">
      Smart Cyber
    </div>
    <nav>
      <a href="#" id="logout">Logout</a>
    </nav>
  </header>

  <main>
    <section class="profile">
      <h2>Welcome, <span id="user-name">User</span></h2>
      <p>Email: <span id="user-email"></span></p>
      <p>Phone: <span id="user-phone"></span></p>
      <button id="update-profile-btn" class="btn">Update Profile</button>
      <button id="change-password-btn" class="btn">Change Password</button>
    </section>

    <section class="services">
      <h2>Your Services</h2>
      <div id="service-list"></div>
      <button id="new-service-btn" class="btn">Request New Service</button>
    </section>

    <section class="transactions">
      <h2>Payment History</h2>
      <div id="transaction-list"></div>
    </section>

    <section class="support">
      <h2>Support Tickets</h2>
      <form id="ticket-form">
        <input type="text" name="title" placeholder="Ticket Title" required>
        <textarea name="description" placeholder="Describe your issue" required></textarea>
        <input type="file" name="files" multiple>
        <button type="submit" class="btn">Submit Ticket</button>
      </form>
      <div id="ticket-list"></div>
    </section>
  </main>

  <footer>
    <p>© 2025 Smart Cyber. All Rights Reserved.</p>
  </footer>

  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="dashboard.js"></script>
</body>
</html>
