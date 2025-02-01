local telescope = require('telescope')
local telescope_builtin = require('telescope.builtin')

vim.keymap.set('n', '<leader>ff', telescope_builtin.find_files, { desc = 'Telescope find files' })
vim.keymap.set('n', '<leader>fg', telescope_builtin.git_files, { desc = 'Telescope git files' })
vim.keymap.set('n', '<leader>fb', telescope_builtin.buffers, { desc = 'Telescope buffers' })
vim.keymap.set('n', '<leader>fh', telescope_builtin.help_tags, { desc = 'Telescope help' })

vim.keymap.set('n', '<leader>fe', function()
  telescope.extensions.file_browser.file_browser({ cwd = vim.fn.expand('%:p:h'), select_buffer = true, hidden = true })
end, { desc = 'Telescope file browser' })
