local telescope_builtin = require('telescope.builtin')

vim.g.mapleader = ' '

vim.keymap.set('n', '<leader>e', ':Neotree float reveal<CR>')

vim.keymap.set('n', '<leader>ff', telescope_builtin.find_files, {})
vim.keymap.set('n', '<leader>fg', telescope_builtin.live_grep, {})
vim.keymap.set('n', '<leader>fb', telescope_builtin.buffers, {})
vim.keymap.set('n', '<leader>fh', telescope_builtin.help_tags, {})
