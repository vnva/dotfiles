return {
  'neovim/nvim-lspconfig',
  dependencies = {
    'williamboman/mason.nvim',
    'folke/neodev.nvim',
    'WhoIsSethDaniel/mason-tool-installer.nvim',
    'saghen/blink.cmp',
  },
  opts = {
    servers = {
      lua_ls = {},
    },
  },
  config = function(_, opts)
    require('mason').setup()

    require('mason-tool-installer').setup({
      ensure_installed = {
        'lua-language-server',
        'stylua',
        'prettierd',
      },
    })

    require('neodev').setup()

    local lspconfig = require('lspconfig')

    for server, config in pairs(opts.servers) do
      config.capabilities = require('blink.cmp').get_lsp_capabilities(config.capabilities)
      lspconfig[server].setup(config)
    end
  end,
}
