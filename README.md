# iaa-portal

Institute of Accountancy Arusha (IAA) Portal with embedded n8n AI Assistant chatbot.

## Features
- **Modern Responsive Design**: Single-page clone of the official Institute of Accountancy Arusha portal.
- **Local Assets**: Bundled high-resolution logos, partner badges, and hero slider photography for offline reliability.
- **Interactive Programme Search**: Real-time autocomplete search across undergraduate and postgraduate programmes.
- **Campus Events & Announcements**: Filterable notice board with document download links.
- **n8n AI Agent Integration**: Official `@n8n/chat` embedded widget styled in IAA navy (`#10497E`) and maroon crimson (`#A41E22`).
- **Vercel Ready**: Preconfigured with `vercel.json` for one-click deployment.

## Deploy to Vercel
1. Import this repository into [Vercel](https://vercel.com/new).
2. Deploy directly.
3. Configure your production domain inside your n8n Chat Trigger Node under **Allowed Origins (CORS)**.
4. Paste your n8n production webhook URL into `index.html`.
