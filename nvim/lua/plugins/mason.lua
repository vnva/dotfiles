return {
  'williamboman/mason.nvim',
  dependencies = { 'WhoIsSethDaniel/mason-tool-installer.nvim' },
  config = function()
    require('mason').setup()
    require('mason-tool-installer').setup({
      ensure_installed = {
        'lua-language-server',
        'stylua',
        'typescript-language-server',
        'eslint-lsp',
        'prettier',
        'yamlfmt',
        'rust-analyzer',
        'rustfmt',
      },
    })
  end,
}
