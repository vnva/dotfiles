return {
  'nvim-neo-tree/neo-tree.nvim',
  dependencies = {
    'nvim-lua/plenary.nvim',
    'nvim-tree/nvim-web-devicons',
    'MunifTanjim/nui.nvim',
  },
  opts = {
    popup_border_style = 'rounded',
    close_if_last_window = false,
    filesystem = {
      hijack_netrw_behavior = 'open_current',
    },
  },
}
