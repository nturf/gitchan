import { GoogleGenAI } from "@google/genai";
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export async function summarizer(diff: string) {
    const instruction = `You are an expert programmer, and you are trying to summarize a git diff.
    Reminders about the git diff format:
    For every file, there are a few metadata lines, like (for example):
    \`\`\`
    diff --git a/lib/index.js b/lib/index.js
    index aadf691..bfef603 100644
    --- a/lib/index.js
    +++ b/lib/index.js
    \`\`\`
    This means that \`lib/index.js\` was modified in this commit. Note that this is only an example.
    Then there is a specifier of the lines that were modified.
    A line starting with \`+\` means it was added.
    A line that starting with \`-\` means that line was deleted.
    A line that starts with neither \`+\` nor \`-\` is code given for context and better understanding.
    It is not part of the diff.
    [...]
    EXAMPLE SUMMARY COMMENTS:
    \`\`\`
    * Raised the amount of returned recordings from \`10\` to \`100\` [packages/server/recordings_api.ts], [packages/server/constants.ts]
    * Fixed a typo in the github action name [.github/workflows/gpt-commit-summarizer.yml]
    * Moved the \`octokit\` initialization to a separate file [src/octokit.ts], [src/index.ts]
    * Added an OpenAI API for completions [packages/utils/apis/openai.ts]
    * Lowered numeric tolerance for test files
    \`\`\`
    Most commits will have less comments than this examples list.
    The last comment does not include the file names,
    because there were more than two relevant files in the hypothetical commit.
    Do not include parts of the example in your summary.

    Please summarize the following git diff:

    ${diff}`;

    const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-001",
        contents: instruction,
    });
    console.log(response.text);
}

// console.log(summarizer(`
// diff --git a/init.lua b/init.lua
// index 584ec09..a810bc6 100644
// --- a/init.lua
// +++ b/init.lua
// @@ -1,2 +1 @@
// -require("thestraybyte")
// -
// +require("nturf")
// diff --git a/lazy-lock.json b/lazy-lock.json
// index 62a660e..6da4daa 100644
// --- a/lazy-lock.json
// +++ b/lazy-lock.json
// @@ -1,33 +1,30 @@
//  {
//    "Comment.nvim": { "branch": "master", "commit": "e30b7f2008e52442154b66f7c519bfd2f1e32acb" },
// -  "LuaSnip": { "branch": "master", "commit": "03c8e67eb7293c404845b3982db895d59c0d1538" },
// -  "cellular-automaton.nvim": { "branch": "main", "commit": "1606e9d5d04ff254023c3f3c62842d065708d6d3" },
// +  "LuaSnip": { "branch": "master", "commit": "458560534a73f7f8d7a11a146c801db00b081df0" },
//    "cmp-buffer": { "branch": "main", "commit": "b74fab3656eea9de20a9b8116afa3cfc4ec09657" },
// -  "cmp-cmdline": { "branch": "main", "commit": "d250c63aa13ead745e3a40f61fdd3470efde3923" },
//    "cmp-nvim-lsp": { "branch": "main", "commit": "a8912b88ce488f411177fc8aed358b04dc246d7b" },
//    "cmp-path": { "branch": "main", "commit": "c6635aae33a50d6010bf1aa756ac2398a2d54c32" },
//    "cmp_luasnip": { "branch": "master", "commit": "98d9cb5c2c38532bd9bdb481067b20fea8f32e90" },
// -  "conform.nvim": { "branch": "master", "commit": "a4bb5d6c4ae6f32ab13114e62e70669fa67745b9" },
// -  "copilot.vim": { "branch": "release", "commit": "d1e8429bef7f7709586886b0a23a46fbecc685c4" },
// -  "fidget.nvim": { "branch": "main", "commit": "d9ba6b7bfe29b3119a610892af67602641da778e" },
// +  "conform.nvim": { "branch": "master", "commit": "8132ec733eed3bf415b97b76797ca41b59f51d7d" },
// +  "copilot.vim": { "branch": "release", "commit": "3955014c503b0cd7b30bc56c86c56c0736ca0951" },
//    "friendly-snippets": { "branch": "main", "commit": "572f5660cf05f8cd8834e096d7b4c921ba18e175" },
//    "harpoon": { "branch": "harpoon2", "commit": "ed1f853847ffd04b2b61c314865665e1dadf22c7" },
// -  "hererocks": { "branch": "master", "commit": "344c46ed54df9a4dbc2d2bf510dcd9a9d90497bf" },
//    "lazy.nvim": { "branch": "main", "commit": "6c3bda4aca61a13a9c63f1c1d1b16b9d3be90d7a" },
// -  "mason-lspconfig.nvim": { "branch": "main", "commit": "1a31f824b9cd5bc6f342fc29e9a53b60d74af245" },
// -  "mason.nvim": { "branch": "main", "commit": "fc98833b6da5de5a9c5b1446ac541577059555be" },
// -  "nvim-autopairs": { "branch": "master", "commit": "4d74e75913832866aa7de35e4202463ddf6efd1b" },
// +  "lspkind.nvim": { "branch": "master", "commit": "d79a1c3299ad0ef94e255d045bed9fa26025dab6" },
// +  "mason-lspconfig.nvim": { "branch": "main", "commit": "c4c84f4521d62de595c0d0f718a9a40c1890c8ce" },
// +  "mason-tool-installer.nvim": { "branch": "main", "commit": "93a9ff9b34c91c0cb0f7de8d5f7e4abce51d8903" },
// +  "mason.nvim": { "branch": "main", "commit": "8024d64e1330b86044fed4c8494ef3dcd483a67c" },
//    "nvim-cmp": { "branch": "main", "commit": "b5311ab3ed9c846b585c0c15b7559be131ec4be9" },
// -  "nvim-lint": { "branch": "master", "commit": "fdb04e9285edefbe25a02a31a35e8fbb10fe054d" },
// -  "nvim-lspconfig": { "branch": "master", "commit": "2e74354b2752cb4980fca35c451792908c186f2f" },
// -  "nvim-treesitter": { "branch": "master", "commit": "4c7509e7b06cea99065e8d4a20d30e6a2e5cd924" },
// -  "obsidian.nvim": { "branch": "main", "commit": "14e0427bef6c55da0d63f9a313fd9941be3a2479" },
// -  "plenary": { "branch": "master", "commit": "857c5ac632080dba10aae49dba902ce3abf91b35" },
// +  "nvim-emmet": { "branch": "main", "commit": "cde4fb2968704aae5c18b7f8a9bc2508767bb78d" },
// +  "nvim-lint": { "branch": "master", "commit": "2b0039b8be9583704591a13129c600891ac2c596" },
// +  "nvim-lsp-file-operations": { "branch": "master", "commit": "9744b738183a5adca0f916527922078a965515ed" },
// +  "nvim-lspconfig": { "branch": "master", "commit": "6bba673aa8993eceec233be17b42ddfb9540794b" },
// +  "nvim-treesitter": { "branch": "master", "commit": "42fc28ba918343ebfd5565147a42a26580579482" },
// +  "nvim-ts-autotag": { "branch": "main", "commit": "a1d526af391f6aebb25a8795cbc05351ed3620b5" },
//    "plenary.nvim": { "branch": "master", "commit": "857c5ac632080dba10aae49dba902ce3abf91b35" },
//    "rose-pine": { "branch": "main", "commit": "6b9840790cc7acdfadde07f308d34b62dd9cc675" },
//    "telescope.nvim": { "branch": "master", "commit": "d90956833d7c27e73c621a61f20b29fdb7122709" },
// +  "trouble.nvim": { "branch": "main", "commit": "85bedb7eb7fa331a2ccbecb9202d8abba64d37b3" },
//    "undotree": { "branch": "master", "commit": "b951b87b46c34356d44aa71886aecf9dd7f5788a" },
// -  "vague.nvim": { "branch": "main", "commit": "9f1ae62d2522f75f3cc857a23a4b87125edce1ad" },
// -  "vim-fugitive": { "branch": "master", "commit": "4a745ea72fa93bb15dd077109afbb3d1809383f2" },
// -  "zen-mode.nvim": { "branch": "main", "commit": "863f150ca321b3dd8aa1a2b69b5f411a220e144f" }
// +  "vague.nvim": { "branch": "main", "commit": "41b6b9a985c9091d0ec8571191e89d6950968cec" }
//  }
// diff --git a/lua/thestraybyte/autocmds.lua b/lua/thestraybyte/autocmds.lua
// deleted file mode 100644
// index 0cad3ef..0000000
// --- a/lua/thestraybyte/autocmds.lua
// +++ /dev/null
// @@ -1,67 +0,0 @@
// -local augroup = vim.api.nvim_create_augroup
// -local straybyte_group = augroup('Straybyte', {})
// -local yank_group = augroup("HighlightYank", {})
// -
// -local autocmd = vim.api.nvim_create_autocmd
// -
// -function R(name)
// -    require("plenery.reload").reload_module(name)
// -end
// -
// -autocmd("FileType", {
// -    pattern = "netrw",
// -    callback = function()
// -        vim.opt_local.readonly = false
// -        vim.opt_local.modifiable = true
// -    end
// -})
// -
// -
// -autocmd('TextYankPost', {
// -    group = yank_group,
// -    pattern = '*',
// -    callback = function()
// -        vim.highlight.on_yank({
// -            higroup = 'IncSearch',
// -            timeout = 40,
// -        })
// -    end,
// -})
// -
// -autocmd('TextYankPost', {
// -    group = yank_group,
// -    pattern = '*',
// -    callback = function()
// -        vim.highlight.on_yank({
// -            higroup = 'IncSearch',
// -            timeout = 40,
// -        })
// -    end,
// -})
// -
// --- Enable wrap for .txt and .md files
// -vim.api.nvim_create_autocmd("FileType", {
// -    pattern = { "markdown", "text" },
// -    callback = function()
// -        vim.opt_local.wrap = true
// -        vim.opt_local.linebreak = true
// -        vim.opt_local.breakindent = true
// -    end,
// -})
// -
// -autocmd('LspAttach', {
// -    group = straybyte_group,
// -    callback = function(e)
// -        local opts = { buffer = e.buf }
// -        vim.keymap.set("n", "gd", function() vim.lsp.buf.definition() end, opts)
// -        vim.keymap.set("n", "K", function() vim.lsp.buf.hover() end, opts)
// -        vim.keymap.set("n", "<leader>vws", function() vim.lsp.buf.workspace_symbol() end, opts)
// -        vim.keymap.set("n", "<leader>vd", function() vim.diagnostic.open_float() end, opts)
// -        vim.keymap.set("n", "<leader>vca", function() vim.lsp.buf.code_action() end, opts)
// -        vim.keymap.set("n", "<leader>vrr", function() vim.lsp.buf.references() end, opts)
// -        vim.keymap.set("n", "<leader>vrn", function() vim.lsp.buf.rename() end, opts)
// -        vim.keymap.set("i", "<C-h>", function() vim.lsp.buf.signature_help() end, opts)
// -        vim.keymap.set("n", "[d", function() vim.diagnostic.goto_next() end, opts)
// -        vim.keymap.set("n", "]d", function() vim.diagnostic.goto_prev() end, opts)
// -    end
// -})
// diff --git a/lua/thestraybyte/init.lua b/lua/thestraybyte/init.lua
// deleted file mode 100644
// index a4acf3d..0000000
// --- a/lua/thestraybyte/init.lua
// +++ /dev/null
// @@ -1,8 +0,0 @@
// -require("thestraybyte.opt")
// -require("thestraybyte.remaps")
// -require("thestraybyte.autocmds")
// -require("thestraybyte.lazy-init")
// -
// -vim.g.netrw_browse_split = 0
// -vim.g.netrw_banner = 0
// -vim.g.netrw_winsize = 25
// diff --git a/lua/thestraybyte/lazy-init.lua b/lua/thestraybyte/lazy-init.lua
// deleted file mode 100644
// index c760063..0000000
// --- a/lua/thestraybyte/lazy-init.lua
// +++ /dev/null
// @@ -1,17 +0,0 @@
// -local lazypath = vim.fn.stdpath("data") .. "/lazy/lazy.nvim"
// -if not vim.loop.fs_stat(lazypath) then
// -    vim.fn.system({
// -        "git",
// -        "clone",
// -        "--filter=blob:none",
// -        "https://github.com/folke/lazy.nvim.git",
// -        "--branch=stable", -- latest stable release
// -        lazypath,
// -    })
// -end
// -vim.opt.rtp:prepend(lazypath)
// -
// -require("lazy").setup({
// -    spec = "thestraybyte.lazyaf",
// -    change_detection = { notify = false }
// -})
// diff --git a/lua/thestraybyte/lazyaf/colors.lua b/lua/thestraybyte/lazyaf/colors.lua
// deleted file mode 100644
// index 7693177..0000000
// --- a/lua/thestraybyte/lazyaf/colors.lua
// +++ /dev/null
// @@ -1,37 +0,0 @@
// -function Themes(color)
// -    color = color or "vague"
// -    vim.cmd.colorscheme(color)
// -
// -    vim.api.nvim_set_hl(0, "Normal", { bg = "none" })
// -    vim.api.nvim_set_hl(0, "NormalFloat", { bg = "none" })
// -end
// -
// -return {
// -
// -    {
// -        "vague2k/vague.nvim",
// -        config = function()
// -            require("vague").setup({
// -                transparent = true,
// -            })
// -            vim.cmd("colorscheme vague")
// -            vim.cmd(":hi statusline guibg=#232136")
// -        end
// -    },
// -
// -
// -    {
// -        "rose-pine/neovim",
// -        name = "rose-pine",
// -        config = function()
// -            require('rose-pine').setup({
// -                disable_background = true,
// -                styles = {
// -                    italic = false,
// -                },
// -            })
// -        end
// -    },
// -
// -
// -}
// diff --git a/lua/thestraybyte/lazyaf/comment.lua b/lua/thestraybyte/lazyaf/comment.lua
// deleted file mode 100644
// index 54de8e9..0000000
// --- a/lua/thestraybyte/lazyaf/comment.lua
// +++ /dev/null
// @@ -1,28 +0,0 @@
// -return {
// -    "numToStr/Comment.nvim",
// -    event = { "BufReadPost", "BufNewFile" },
// -    config = function()
// -        require('Comment').setup({
// -            -- Optional configuration can go here
// -            toggler = {
// -                line = '<leader>/',    -- Toggle comment for current line
// -                block = '<leader>?'   -- Toggle comment for current block
// -            },
// -            opleader = {
// -                line = '<leader>/',    -- Comment motion linewise
// -                block = '<leader>?'   -- Comment motion blockwise
// -            },
// -            extra = {
// -                -- Optional: Add extra mappings
// -                above = '<leader>cO',
// -                below = '<leader>co',
// -                eol = '<leader>cA'
// -            }
// -        })
// -    end,
// -    keys = {
// -        -- { '<leader>/', mode = { 'n', 'x' }, desc = 'Toggle comment' },
// -        -- { '<leader>?', mode = { 'n', 'x' }, desc = 'Toggle block comment' }
// -    }
// -}
// -
// diff --git a/lua/thestraybyte/lazyaf/copilot.lua b/lua/thestraybyte/lazyaf/copilot.lua
// deleted file mode 100644
// index c5d0065..0000000
// --- a/lua/thestraybyte/lazyaf/copilot.lua
// +++ /dev/null
// @@ -1,32 +0,0 @@
// -return {
// -    {
// -        "github/copilot.vim",
// -        lazy = false, -- Load immediately
// -        config = function()
// -            -- Disable Copilot by default (optional)
// -            vim.g.copilot_enabled = 1
// -
// -            -- Suggested keybindings
// -            vim.keymap.set("i", "<C-j>", 'copilot#Accept("<CR>")',
// -                { expr = true, silent = true, replace_keycodes = false })
// -            vim.keymap.set("i", "<C-k>", "<Plug>(copilot-dismiss)", { silent = true })
// -            vim.keymap.set("i", "<C-l>", "<Plug>(copilot-next)", { silent = true })
// -            vim.keymap.set("i", "<C-h>", "<Plug>(copilot-previous)", { silent = true })
// -
// -            -- Set Copilot filetypes (optional)
// -            vim.g.copilot_filetypes = {
// -                markdown = true,
// -                txt = true,
// -                gitcommit = true,
// -                lua = true,
// -                javascript = false,
// -                typescript = false,
// -                javascriptreact = false,
// -                typescriptreact = false,
// -                html = false,
// -                css = true,
// -                sh = false,
// -            }
// -        end
// -    }
// -}
// diff --git a/lua/thestraybyte/lazyaf/fugitive.lua b/lua/thestraybyte/lazyaf/fugitive.lua
// deleted file mode 100644
// index 1739932..0000000
// --- a/lua/thestraybyte/lazyaf/fugitive.lua
// +++ /dev/null
// @@ -1,38 +0,0 @@
// -return {
// -    "tpope/vim-fugitive",
// -    config = function()
// -        vim.keymap.set("n", "<leader>gs", vim.cmd.Git)
// -
// -        local ThePrimeagen_Fugitive = vim.api.nvim_create_augroup("ThePrimeagen_Fugitive", {})
// -
// -        local autocmd = vim.api.nvim_create_autocmd
// -        autocmd("BufWinEnter", {
// -            group = ThePrimeagen_Fugitive,
// -            pattern = "*",
// -            callback = function()
// -                if vim.bo.ft ~= "fugitive" then
// -                    return
// -                end
// -
// -                local bufnr = vim.api.nvim_get_current_buf()
// -                local opts = {buffer = bufnr, remap = false}
// -                vim.keymap.set("n", "<leader>p", function()
// -                    vim.cmd.Git('push')
// -                end, opts)
// -
// -                -- rebase always
// -                vim.keymap.set("n", "<leader>P", function()
// -                    vim.cmd.Git({'pull',  '--rebase'})
// -                end, opts)
// -
// -                -- NOTE: It allows me to easily set the branch i am pushing and any tracking
// -                -- needed if i did not set the branch up correctly
// -                vim.keymap.set("n", "<leader>t", ":Git push -u origin ", opts);
// -            end,
// -        })
// -
// -
// -        vim.keymap.set("n", "gu", "<cmd>diffget //2<CR>")
// -        vim.keymap.set("n", "gh", "<cmd>diffget //3<CR>")
// -    end
// -}
// diff --git a/lua/thestraybyte/lazyaf/harpoon.lua b/lua/thestraybyte/lazyaf/harpoon.lua
// deleted file mode 100644
// index 0ed64e7..0000000
// --- a/lua/thestraybyte/lazyaf/harpoon.lua
// +++ /dev/null
// @@ -1,31 +0,0 @@
// -return {
// -    {
// -        "ThePrimeagen/harpoon",
// -        branch = "harpoon2",
// -        dependencies = { "nvim-lua/plenary.nvim" }, -- Required dependency
// -        lazy = false, -- Load immediately
// -        config = function()
// -            local harpoon = require("harpoon")
// -
// -            harpoon:setup() -- Initialize Harpoon
// -
// -            -- Adding files
// -            vim.keymap.set("n", "<leader>A", function() harpoon:list():prepend() end, { desc = "Prepend to Harpoon List" })
// -            vim.keymap.set("n", "<leader>a", function() harpoon:list():add() end, { desc = "Add to Harpoon List" })
// -            vim.keymap.set("n", "<C-e>", function() harpoon.ui:toggle_quick_menu(harpoon:list()) end, { desc = "Toggle Harpoon Menu" })
// -
// -            -- Navigation
// -            vim.keymap.set("n", "<leader>j", function() harpoon:list():select(1) end, { desc = "Harpoon to 1" })
// -            vim.keymap.set("n", "<leader>k", function() harpoon:list():select(2) end, { desc = "Harpoon to 2" })
// -            vim.keymap.set("n", "<leader>l", function() harpoon:list():select(3) end, { desc = "Harpoon to 3" })
// -            vim.keymap.set("n", "<leader>i", function() harpoon:list():select(4) end, { desc = "Harpoon to 4" })
// -
// -            -- Replace at specific index
// -            vim.keymap.set("n", "<leader><C-j>", function() harpoon:list():replace_at(1) end, { desc = "Replace Harpoon at 1" })
// -            vim.keymap.set("n", "<leader><C-k>", function() harpoon:list():replace_at(2) end, { desc = "Replace Harpoon at 2" })
// -            vim.keymap.set("n", "<leader><C-l>", function() harpoon:list():replace_at(3) end, { desc = "Replace Harpoon at 3" })
// -            vim.keymap.set("n", "<leader><C-i>", function() harpoon:list():replace_at(4) end, { desc = "Replace Harpoon at 4" })
// -        end
// -    }
// -}
// -
// diff --git a/lua/thestraybyte/lazyaf/init.lua b/lua/thestraybyte/lazyaf/init.lua
// deleted file mode 100644
// index a490730..0000000
// --- a/lua/thestraybyte/lazyaf/init.lua
// +++ /dev/null
// @@ -1,9 +0,0 @@
// -return {
// -
// -    {
// -        "nvim-lua/plenary.nvim",
// -        name = "plenary"
// -    },
// -
// -    "eandrju/cellular-automaton.nvim",
// -}
// diff --git a/lua/thestraybyte/lazyaf/lint.lua b/lua/thestraybyte/lazyaf/lint.lua
// deleted file mode 100644
// index 3e77853..0000000
// --- a/lua/thestraybyte/lazyaf/lint.lua
// +++ /dev/null
// @@ -1,32 +0,0 @@
// -return {
// -    "mfussenegger/nvim-lint",
// -
// -    config = function()
// -        local lint = require("lint")
// -
// -        -- Dynamically determine ESLint path (prefer project-local version)
// -        lint.linters.eslint.cmd = function()
// -            local eslint_local = vim.fn.getcwd() .. "/node_modules/.bin/eslint"
// -            return vim.fn.filereadable(eslint_local) == 1 and eslint_local or "eslint"
// -        end
// -
// -        -- Assign linters by filetype
// -        lint.linters_by_ft = {
// -            -- javascript = { "eslint" },
// -            -- typescript = { "eslint" },
// -            -- javascriptreact = { "eslint" },
// -            -- typescriptreact = { "eslint" },
// -            -- css = { "stylelint" }, -- uncomment if using stylelint
// -        }
// -
// -        -- Auto-run linter on save or text change, only if a linter is defined
// -        vim.api.nvim_create_autocmd({ "BufWritePost", "TextChanged" }, {
// -            callback = function()
// -                local ft = vim.bo.filetype
// -                if lint.linters_by_ft[ft] then
// -                    lint.try_lint()
// -                end
// -            end,
// -        })
// -    end
// -}
// diff --git a/lua/thestraybyte/lazyaf/lsp.lua b/lua/thestraybyte/lazyaf/lsp.lua
// deleted file mode 100644
// index d35c252..0000000
// --- a/lua/thestraybyte/lazyaf/lsp.lua
// +++ /dev/null
// @@ -1,215 +0,0 @@
// -return {
// -    "neovim/nvim-lspconfig",
// -    dependencies = {
// -        "stevearc/conform.nvim",
// -        "williamboman/mason.nvim",
// -        "williamboman/mason-lspconfig.nvim",
// -        "hrsh7th/cmp-nvim-lsp",
// -        "hrsh7th/cmp-buffer",
// -        "hrsh7th/cmp-path",
// -        "hrsh7th/cmp-cmdline",
// -        "hrsh7th/nvim-cmp",
// -        "L3MON4D3/LuaSnip",
// -        "saadparwaiz1/cmp_luasnip",
// -        "j-hui/fidget.nvim",
// -        "windwp/nvim-autopairs",
// -    },
// -
// -    config = function()
// -        require("conform").setup({
// -            formatters_by_ft = {
// -                javascript = { "prettierd" },
// -                typescript = { "prettierd" },
// -                javascriptreact = { "prettierd" },
// -                typescriptreact = { "prettierd" },
// -                html = { "prettierd" },
// -                css = { "prettierd" },
// -            }
// -        })
// -
// -        -- Setup Autopairs (integrates with nvim-cmp)
// -
// -        -- require("nvim-autopairs").setup({
// -        --     check_ts = true, -- Use Treesitter for better context
// -        --     disable_filetype = { "TelescopePrompt", "vim" },
// -        -- })
// -
// -
// -
// -        local cmp_autopairs = require("nvim-autopairs.completion.cmp")
// -        local acmp = require("cmp")
// -        acmp.event:on("confirm_done", cmp_autopairs.on_confirm_done())
// -
// -        local cmp = require('cmp')
// -        local cmp_lsp = require("cmp_nvim_lsp")
// -        local capabilities = vim.tbl_deep_extend(
// -            "force",
// -            {},
// -            vim.lsp.protocol.make_client_capabilities(),
// -            cmp_lsp.default_capabilities())
// -
// -        require("fidget").setup({})
// -        require("mason").setup()
// -        require("mason-lspconfig").setup({
// -            ensure_installed = {
// -                "lua_ls",
// -                "rust_analyzer",
// -                "gopls",
// -                "html",
// -                "cssls",
// -                "ts_ls",
// -                "tailwindcss",
// -                "emmet_ls",
// -            },
// -            handlers = {
// -                function(server_name) -- default handler (optional)
// -                    require("lspconfig")[server_name].setup {
// -                        capabilities = capabilities
// -                    }
// -                end,
// -                ["ts_ls"] = function()
// -                    require("lspconfig").ts_ls.setup({
// -                        capabilities = capabilities,
// -                        settings = {
// -                            javascript = { format = { enable = false } },
// -                            typescript = { format = { enable = false } },
// -                        },
// -                    })
// -                end,
// -
// -                ["gopls"] = function()
// -                    require("lspconfig").gopls.setup({
// -                        capabilities = capabilities,
// -                        filetypes = { "go", "gomod" },
// -                    })
// -                end,
// -
// -                ["emmet_ls"] = function()
// -                    require("lspconfig").emmet_ls.setup({
// -                        capabilities = capabilities,
// -                        filetypes = { "html", "scss" },
// -                    })
// -                end,
// -
// -                ["tailwindcss"] = function()
// -                    require("lspconfig").tailwindcss.setup({
// -                        capabilities = capabilities,
// -                        filetypes = { "html", "css", "javascriptreact", "typescriptreact" },
// -                    })
// -                end,
// -
// -                zls = function()
// -                    local lspconfig = require("lspconfig")
// -                    lspconfig.zls.setup({
// -                        root_dir = lspconfig.util.root_pattern(".git", "build.zig", "zls.json"),
// -                        settings = {
// -                            zls = {
// -                                enable_inlay_hints = true,
// -                                enable_snippets = true,
// -                                warn_style = true,
// -                            },
// -                        },
// -                    })
// -                    vim.g.zig_fmt_parse_errors = 0
// -                    vim.g.zig_fmt_autosave = 0
// -                end,
// -                ["lua_ls"] = function()
// -                    local lspconfig = require("lspconfig")
// -                    lspconfig.lua_ls.setup {
// -                        capabilities = capabilities,
// -                        settings = {
// -                            Lua = {
// -                                runtime = { version = "Lua 5.1" },
// -                                diagnostics = {
// -                                    globals = { "bit", "vim", "it", "describe", "before_each", "after_each" },
// -                                }
// -                            }
// -                        }
// -                    }
// -                end,
// -            }
// -        })
// -
// -        local l = vim.lsp
// -        l.handlers["textDocument/hover"] = function(_, result, ctx, config)
// -            if not (result and result.contents) then return end
// -
// -            local markdown_lines = l.util.convert_input_to_markdown_lines(result.contents)
// -            markdown_lines = vim.tbl_filter(function(line)
// -                return line ~= ""
// -            end, markdown_lines)
// -
// -            if vim.tbl_isempty(markdown_lines) then return end
// -
// -            config = vim.tbl_deep_extend("force", {
// -                border = "rounded",
// -                focusable = true,
// -                max_width = 80,
// -                wrap = true,
// -                winhighlight = "Normal:CmpNormal,FloatBorder:FloatBorder", -- this line ensures visible borders
// -            }, config or {})
// -
// -            config.focus_id = ctx.method
// -
// -            return l.util.open_floating_preview(markdown_lines, "markdown", config)
// -        end
// -
// -
// -        local cmp_select = { behavior = cmp.SelectBehavior.Select }
// -        vim.api.nvim_set_hl(0, "CmpNormal", {})
// -
// -        cmp.setup({
// -            snippet = {
// -                expand = function(args)
// -                    require('luasnip').lsp_expand(args.body)
// -                end,
// -            },
// -            mapping = cmp.mapping.preset.insert({
// -                ['<C-p>'] = cmp.mapping.select_prev_item(cmp_select),
// -                ['<C-n>'] = cmp.mapping.select_next_item(cmp_select),
// -                ['<C-y>'] = cmp.mapping.confirm({ select = true }),
// -                ['<C-Space>'] = cmp.mapping.complete(),
// -                ['<C-e>'] = vim.NIL
// -            }),
// -            window = {
// -                completion = {
// -                    scrollbar = false,
// -                    border = "rounded",
// -                    winhighlight = "Normal:CmpNormal",
// -                },
// -                documentation = {
// -                    scrollbar = false,
// -                    border = "rounded",
// -                    winhighlight = "Normal:CmpNormal",
// -                }
// -            },
// -            sources = cmp.config.sources({
// -                { name = 'luasnip',  priority = 1000 },
// -                { name = 'nvim_lsp', priority = 900 },
// -            }, {
// -                { name = 'buffer', priority = 500 },
// -            })
// -        })
// -
// -        -- Diagnostics Config
// -        vim.diagnostic.config({
// -            float = {
// -                focusable = false,
// -                style = "minimal",
// -                border = "rounded",
// -                source = "always",
// -                header = "",
// -                prefix = "",
// -                max_width = 80,
// -                wrap = true,
// -            },
// -        })
// -
// -        -- Toggle virtual text diagnostics with <leader>er
// -        vim.keymap.set("n", "<leader>er", function()
// -            local current = vim.diagnostic.config().virtual_text
// -            vim.diagnostic.config({ virtual_text = not current })
// -            print("Diagnostics: " .. (current and "OFF" or "ON"))
// -        end, { desc = "Toggle inline diagnostics" })
// -    end
// -}
// diff --git a/lua/thestraybyte/lazyaf/obsidian.lua b/lua/thestraybyte/lazyaf/obsidian.lua
// deleted file mode 100644
// index e518520..0000000
// --- a/lua/thestraybyte/lazyaf/obsidian.lua
// +++ /dev/null
// @@ -1,58 +0,0 @@
// -return {
// -    "epwalsh/obsidian.nvim",
// -
// -    dependencies = {
// -        "nvim-lua/plenary.nvim"
// -    },
// -
// -    config = function()
// -        require("obsidian").setup({
// -            workspaces = {
// -                {
// -                    name = "bashneko",
// -                    path = "~/SecondBrain/",
// -                },
// -            },
// -            notes_subdir = "inbox",
// -            new_notes_location = "notes_subdir",
// -            disable_frontmatter = true,
// -            templates = {
// -                subdir = "templates",
// -                date_format = "%Y-%m-%d",
// -                time_format = "%H:%M:%S",
// -            },
// -            mappings = {
// -                ["gf"] = {
// -                    action = function()
// -                        return require("obsidian").util.gf_passthrough()
// -                    end,
// -                    opts = { noremap = false, expr = true, buffer = true },
// -                },
// -            },
// -            completion = {
// -                nvim_cmp = true,
// -                min_chars = 2,
// -            },
// -
// -        --     ui = {
// -        --         enable = false,
// -        --         checkboxes = {},
// -        --         bullets = {},
// -        --     },
// -        })
// -
// -        vim.api.nvim_create_autocmd("FileType", {
// -            pattern = "markdown",
// -            callback = function()
// -                vim.opt.conceallevel = 0
// -            end,
// -        })
// -
// -        -- Keymaps for Obsidian
// -        vim.keymap.set("n", "<leader>oo", ":cd ~/secondBrain/<CR>")
// -        vim.keymap.set("n", "<leader>on", ":ObsidianTemplate note<CR>:lua vim.cmd([[1,/^\\S/s/^\\n\\{1,}//]])<CR>")
// -        vim.keymap.set("n", "<leader>of", ":s/^#\\s*\\([^_]*\\)_\\d\\{4\\}-\\d\\{2\\}-\\d\\{2\\}$/# \\1/<CR>")
// -        vim.keymap.set("n", "<leader>ok", ":silent! !mv '%:p' ~/SecondBrain/reviewed/<CR>:bd<CR>")
// -        vim.keymap.set("n", "<leader>odd", ":silent! !rm -f '%:p'<CR>:bd<CR>")
// -    end
// -}
// diff --git a/lua/thestraybyte/lazyaf/snippets.lua b/lua/thestraybyte/lazyaf/snippets.lua
// deleted file mode 100644
// index ca0cc17..0000000
// --- a/lua/thestraybyte/lazyaf/snippets.lua
// +++ /dev/null
// @@ -1,32 +0,0 @@
// -return {
// -    {
// -        "L3MON4D3/LuaSnip",
// -        version = "v2.*", -- Use latest major release
// -        build = "make install_jsregexp",
// -
// -        dependencies = { "rafamadriz/friendly-snippets" },
// -
// -        config = function()
// -            local ls = require("luasnip")
// -
// -            -- Load VSCode-style snippets (including React)
// -            require("luasnip.loaders.from_vscode").lazy_load()
// -
// -            -- Extend filetypes
// -            ls.filetype_extend("javascript", { "jsdoc" })
// -            ls.filetype_extend("javascriptreact", { "javascript" })               -- Ensure React snippets work
// -            ls.filetype_extend("typescriptreact", { "typescript", "javascript" }) -- Ensure React TS snippets work
// -
// -            -- Keymaps
// -            vim.keymap.set({ "i" }, "<C-s>e", function() ls.expand() end, { silent = true })
// -            vim.keymap.set({ "i", "s" }, "<C-s>;", function() ls.jump(1) end, { silent = true })
// -            vim.keymap.set({ "i", "s" }, "<C-s>,", function() ls.jump(-1) end, { silent = true })
// -
// -            vim.keymap.set({ "i", "s" }, "<C-E>", function()
// -                if ls.choice_active() then
// -                    ls.change_choice(1)
// -                end
// -            end, { silent = true })
// -        end,
// -    }
// -}
// diff --git a/lua/thestraybyte/lazyaf/telescope.lua b/lua/thestraybyte/lazyaf/telescope.lua
// deleted file mode 100644
// index c71a63c..0000000
// --- a/lua/thestraybyte/lazyaf/telescope.lua
// +++ /dev/null
// @@ -1,33 +0,0 @@
// -return {
// -    "nvim-telescope/telescope.nvim",
// -    tag = "0.1.5",
// -    dependencies = {
// -        "nvim-lua/plenary.nvim"
// -    },
// -
// -    config = function()
// -        require('telescope').setup({
// -            pickers = {
// -                find_files = {
// -                    -- hidden = true
// -                }
// -            }
// -        })
// -
// -        local builtin = require('telescope.builtin')
// -        vim.keymap.set('n', '<leader>pf', builtin.find_files, {})
// -        vim.keymap.set('n', '<C-p>', builtin.git_files, {})
// -        vim.keymap.set('n', '<leader>pws', function()
// -            local word = vim.fn.expand("<cword>")
// -            builtin.grep_string({ search = word })
// -        end)
// -        vim.keymap.set('n', '<leader>pWs', function()
// -            local word = vim.fn.expand("<cWORD>")
// -            builtin.grep_string({ search = word })
// -        end)
// -        vim.keymap.set('n', '<leader>ps', function()
// -            builtin.grep_string({ search = vim.fn.input("Grep > ") })
// -        end)
// -        vim.keymap.set('n', '<leader>vh', builtin.help_tags, {})
// -    end
// -}
// diff --git a/lua/thestraybyte/lazyaf/treesitter.lua b/lua/thestraybyte/lazyaf/treesitter.lua
// deleted file mode 100644
// index e974553..0000000
// --- a/lua/thestraybyte/lazyaf/treesitter.lua
// +++ /dev/null
// @@ -1,63 +0,0 @@
// -return {
// -    "nvim-treesitter/nvim-treesitter",
// -    build = ":TSUpdate",
// -    config = function()
// -        require("nvim-treesitter.configs").setup({
// -            -- A list of parser names, or "all"
// -            ensure_installed = {
// -                "vimdoc", "javascript", "typescript", "c", "lua", "rust",
// -                "jsdoc", "bash","html", "css", "tsx",
// -            },
//
// `));
