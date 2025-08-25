const SUPABASE_URL = "https://xbkloxgdqnxuubdnjwzk.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY"; // replace with actual anon key

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const contactForm = document.querySelector("#contact-form");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(contactForm);
  const files = formData.getAll("files");
  const uploadedFiles = [];

  for (let i = 0; i < files.length && i < 5; i++) {
    const file = files[i];
    const { data, error } = await supabase.storage
      .from("contacts")
      .upload(`${Date.now()}_${file.name}`, file);

    if (error) {
      alert("File upload error: " + error.message);
      return;
    }
    uploadedFiles.push(data.path);
  }

  const { data, error } = await supabase.from("contacts").insert([{
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
    files: uploadedFiles
  }]);

  if (error) alert(error.message);
  else {
    alert("Message sent successfully!");
    contactForm.reset();
  }
});
