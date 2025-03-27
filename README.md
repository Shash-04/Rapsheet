# 🎵 Top Artists Tracker

🚀 **A sleek and stylish Next.js app that fetches and displays your top Spotify artists in a unique receipt-like format!**

## 🌟 Features
✅ Fetches your **top artists** from Spotify API 🎧  
✅ Displays the results in a **receipt-styled list** 🧾  
✅ Supports **image downloads** of your top artist list 🖼️  
✅ Uses **html2canvas** to capture and download the receipt 📸  
✅ Beautiful **IBM Plex Mono font styling** ✨  
✅ **Dark theme UI** for a modern look 🌙  

## 🛠️ Tech Stack
- **Next.js** ⚡
- **TypeScript** 📜
- **Tailwind CSS** 🎨
- **Spotify API** 🎶
- **html2canvas** 🖼️
- **React Hooks** 🪝


## 🚀 Getting Started

### **1️⃣ Clone the Repository**
```sh
 git clone https://github.com/yourusername/top-artists-tracker.git
 cd top-artists-tracker
```

### **2️⃣ Install Dependencies**
```sh
npm install
# or
yarn install
```

### **3️⃣ Set Up Environment Variables**
Create a `.env.local` file in the root and add:
```sh
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_client_id
NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET=your_client_secret
```
*(Get your credentials from the Spotify Developer Dashboard!)*

### **4️⃣ Run the App**
```sh
npm run dev
# or
yarn dev
```
🔹 The app will be available at: `http://localhost:3000`

## 📜 API Endpoints
- `/api/spotify/topartist` → Fetches top artists 🎤  
- `/api/spotify/toptracks` → Fetches top tracks 🎤  
- `/api/auth/session` → Manages user authentication 🔐  

## 📌 How It Works
1. **User logs in** and grants permission to access Spotify data 🔑  
2. App **fetches top artists** and displays them 🎨  
2. App **fetches top tracks** and displays them 🎨  
3. User can **download the receipt** as an image 📄  

## 🎨 Customization
Want to tweak the UI? Modify `styles.css` and components inside `components/` folder.

## 🛠️ Known Issues & Fixes
🔴 **Image not loading?** Ensure the Spotify API returns images or use a fallback:  
```tsx
<img src={track.album?.images?.[0]?.url || '/placeholder.jpg'} alt={track.name} />
```

## 🏆 Credits
💡 **Developed by:** [Shashwat Vaish](https://github.com/Shash-04) 🚀

## 📜 License
📝 MIT License – Free to use and modify! 🔥

