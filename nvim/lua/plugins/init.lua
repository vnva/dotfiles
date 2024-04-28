local lazypath = vim.fn.stdpath('data') .. '/lazy/lazy.nvim'
if not vim.loop.fs_stat(lazypath) then
  vim.fn.system({
    'git',
    'clone',
    '--filter=blob:none',
    'https://github.com/folke/lazy.nvim.git',
    '--branch=stable', -- latest stable release
    lazypath,
  })
end
vim.opt.rtp:prepend(lazypath)

local lazy = require('lazy')

lazy.setup({
  require('plugins.neo-tree'),
  require('plugins.mason'),
  require('plugins.lsp-config'),
  require('plugins.conform'),
  require('plugins.neodev'),
  require('plugins.cmp'),
  require('plugins.codeium'),
  require('plugins.telescope'),
  require('plugins.catppuccin'),
})
