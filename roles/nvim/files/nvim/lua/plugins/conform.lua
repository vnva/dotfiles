return {
  'stevearc/conform.nvim',
  config = function()
    local conform = require('conform')

    conform.setup({
      formatters_by_ft = {
        lua = { 'stylua' },
      },
      log_level = vim.log.levels.DEBUG,
    })

    vim.api.nvim_create_autocmd('BufWritePre', {
      pattern = '*',
      callback = function(args)
        conform.format({ bufnr = args.buf })
      end,
    })
  end,
}
