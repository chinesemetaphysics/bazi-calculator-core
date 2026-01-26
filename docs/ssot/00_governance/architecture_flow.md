flowchart TB



%% =========================

%% USERS / BROWSERS

%% =========================

U\[User Browser] -->|HTTPS| CFPG1\[baziful.thearties.com<br/>Cloudflare Pages<br/>Frontend UI]

U -->|HTTPS| CFPG2\[dcompass.thearties.com<br/>Cloudflare Pages<br/>Frontend UI]

U -->|HTTPS| CFPG3\[dportal.thearties.com<br/>Cloudflare Pages<br/>Frontend UI]



%% =========================

%% FRONTEND -> API

%% =========================

CFPG1 -->|fetch() JSON| API\[api.thearties.com<br/>Cloudflare Worker / Pages Functions<br/>Single API]

CFPG2 -->|fetch() JSON| API

CFPG3 -->|fetch() JSON| API



%% =========================

%% BACKEND CORE

%% =========================

API -->|imports| CORE\[Private Core Repo<br/>metaphysics engine + lookup tables]

API -->|reads rules| SSOT\[Private Core Repo<br/>docs/ssot<br/>CMKB SSOT (Single Source of Truth)]



%% =========================

%% STORAGE (optional future)

%% =========================

API -->|optional persistence| KV\[(Cloudflare KV / D1 / R2<br/>cache + storage)]



%% =========================

%% RESPONSES

%% =========================

API -->|JSON response| CFPG1

API -->|JSON response| CFPG2

API -->|JSON response| CFPG3



%% =========================

%% AI AGENTS (DEV PIPELINE)

%% =========================

subgraph DEV\[Development \& AI Agents]

&nbsp;   DEVPC\[Your Windows 11 PC<br/>C:\\\\Projects\\\\websites\\\\\*] -->|git push| GH\[GitHub<br/>Private core repo<br/>Public/Private UI repos]

&nbsp;   

&nbsp;   CC\[Claude Code Agent] -->|MCP filesystem| DEVPC

&nbsp;   CC -->|MCP github| GH

&nbsp;   CC -->|reads| SSOT\_LOCAL\[C:\\\\Projects\\\\websites\\\\core\\\\docs\\\\ssot]

&nbsp;   CC -->|generates patches| DEVPC

&nbsp;   

&nbsp;   AG\[Antigravity Agent] -->|MCP filesystem| DEVPC

&nbsp;   AG -->|MCP github| GH

&nbsp;   AG -->|references| SSOT\_LOCAL



&nbsp;   OC\[OpenCode Agent] -->|MCP filesystem| DEVPC

&nbsp;   OC -->|MCP github| GH

&nbsp;   OC -->|references| SSOT\_LOCAL

end



%% =========================

%% DEPLOYMENT

%% =========================

GH -->|CI/CD Deploy| CFPG1

GH -->|CI/CD Deploy| CFPG2

GH -->|CI/CD Deploy| CFPG3

GH -->|CI/CD Deploy| API



