<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset Password - Smart Cyber</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="auth-container">
    <h2>Reset Your Password</h2>
    <form id="reset-form">
      <input type="password" id="new-password" placeholder="New Password" required>
      <button type="submit" class="btn">Update Password</button>
    </form>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
  <script src="reset.js"></script>
</body>
</html>
