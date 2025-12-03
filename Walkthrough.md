Profile Picture Implementation Walkthrough
Overview
I successfully implemented a custom profile picture upload feature without relying on paid storage services (like Firebase Storage). Instead, I used a Base64 Strategy to store images directly in the Firestore database.

The Base64 Strategy
To bypass the need for a dedicated file storage bucket (which requires a billing card), I implemented the following workflow:

Client-Side Compression:

When a user selects an image, I use an HTML <canvas> to resize it to a maximum of 500x500 pixels.
I compress the quality to 70% (JPEG).
This ensures the final string size is well under the Firestore 1MB document limit (typically ~50-100KB).
Firestore Storage:

The compressed image is converted to a Base64 string (data:image/jpeg;base64,...).
This string is saved to the photoURL field in the users/{uid} document.
Real-Time Sync:

Both the Navbar and Settings Page now use a real-time Firestore listener (onSnapshot) to fetch the photoURL.
This ensures that as soon as an image is uploaded, it instantly updates across the entire application without a page reload.
Key Changes
src/pages/Settings.tsx
Added
handleImageUpload
function with compression logic.
Added useEffect to fetch the real-time avatar from Firestore.
Updated the UI to allow clicking the avatar to upload a new one.
src/components/Navbar.tsx
Added useEffect to fetch the real-time avatar from Firestore.
Updated the avatar src to prioritize the Firestore avatarUrl over the default Auth photoURL.
