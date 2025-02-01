return {
  'nvim-telescope/telescope.nvim',
  dependencies = {
    'nvim-lua/plenary.nvim',
    'nvim-telescope/telescope-file-browser.nvim',
  },
  config = function()
    local telescope = require('telescope')

    telescope.setup({
      extensions = { file_browser = { hijack_netrw = true } },
    })

    telescope.load_extension('file_browser')
  end,
}
