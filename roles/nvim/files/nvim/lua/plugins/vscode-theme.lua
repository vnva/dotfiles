return {
  'Mofiqul/vscode.nvim',
  config = function()
    require('vscode').setup({ transparent = true })
    vim.cmd.colorscheme('vscode')
  end,
}
