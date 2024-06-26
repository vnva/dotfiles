return {
  'stevearc/conform.nvim',
  config = function()
    local conform = require('conform')

    conform.setup({
      formatters_by_ft = {
        lua = { 'stylua' },
        typescript = { 'prettier' },
        typescriptreact = { 'prettier' },
        javascript = { 'prettier' },
        javascriptreact = { 'prettier' },
        markdown = { 'prettier' },
        json = { 'prettier' },
        yaml = { 'prettier' },
        rust = { 'rustfmt' },
      },
    })

    vim.api.nvim_create_autocmd('BufWritePre', {
      pattern = '*',
      callback = function(args)
        conform.format({ bufnr = args.buf })
      end,
    })
  end,
}
