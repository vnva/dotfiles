return {
  'catppuccin/nvim',
  name = 'catppuccin',
  priority = 1000,
  config = function()
    require('catppuccin').setup({
      transparent_background = true,
      term_colors = true,
      integrations = {
        mason = true,
      },
    })

    vim.cmd.colorscheme('catppuccin')
  end,
}
