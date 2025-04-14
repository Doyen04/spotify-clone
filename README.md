# Spotify Clone

Created on: 21th feb 2025


## Project Screenshot
![Project Screenshot](./src/assets/screenshot.png)

## Frameworks and Libraries Used

- @radix-ui/react-dialog: ^1.1.6
- @radix-ui/react-slider: ^1.2.3
- @supabase/auth-helpers-nextjs: ^0.10.0
- @supabase/auth-helpers-react: ^0.5.0
- @supabase/auth-ui-react: ^0.4.7
- @supabase/auth-ui-shared: ^0.1.8
- next: 15.1.6
- query-string: ^9.1.1
- react: ^19.0.0
- react-dom: ^19.0.0
- react-hook-form: ^7.54.2
- react-hot-toast: ^2.5.1
- react-icons: ^5.4.0
- stripe: ^17.6.0
- tailwind-merge: ^3.0.1
- tsup: ^8.3.6
- uniqid: ^5.4.0
- use-sound: ^4.0.3
- zustand: ^5.0.3

## File Tree

```
.
├── .gitignore
├── database.types.ts
├── eslint.config.mjs
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── README.md
├── src
│   ├── actions
│   │   ├── getLikedSongs.ts
│   │   ├── getSongs.ts
│   │   ├── getSongsByTitle.ts
│   │   └── getSongsByUserId.ts
│   ├── app
│   │   ├── (site)
│   │   │   ├── components
│   │   │   │   └── PageContent..tsx
│   │   │   └── page.tsx
│   │   ├── error.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── liked
│   │   │   └── page.tsx
│   │   ├── loading.tsx
│   │   └── search
│   │       └── page.tsx
│   ├── components
│   │   ├── AuthModal.tsx
│   │   ├── Box.tsx
│   │   ├── Button.tsx
│   │   ├── Header.tsx
│   │   ├── Input.tsx
│   │   ├── Library.tsx
│   │   ├── LikeButton.tsx
│   │   ├── LikedContent.tsx
│   │   ├── Listitem.tsx
│   │   ├── MediaItem.tsx
│   │   ├── Modal.tsx
│   │   ├── PlayButton.tsx
│   │   ├── Player.tsx
│   │   ├── PlayerContent.tsx
│   │   ├── SearchContent.tsx
│   │   ├── SearchInput.tsx
│   │   ├── Sidebar.tsx
│   │   ├── SidebarItem.tsx
│   │   ├── Slider.tsx
│   │   ├── SongItem.tsx
│   │   └── UploadModal.tsx
│   ├── hooks
│   │   ├── useAuthModal.tsx
│   │   ├── useDebounce.ts
│   │   ├── useGetSongsById.ts
│   │   ├── useLoadImage.ts
│   │   ├── useLoadSongUrl.ts
│   │   ├── useOnPlay.ts
│   │   ├── usePlayer.tsx
│   │   └── useUploadModal.tsx
│   ├── middleware.ts
│   ├── providers
│   │   ├── ModalProvider.tsx
│   │   ├── SuperbaseProvider.tsx
│   │   └── UserProvider.tsx
│   └── types.ts
├── supabase
│   ├── .gitignore
│   └── config.toml
├── tailwind.config.ts
└── tsconfig.json
```
