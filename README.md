# ⛺️ vnva's dotfiles

## Usage

Clone repo

```sh
git clone git@github.com:vnva/dotfiles.git ~/.dotfiles
```

Link the dotfiles

```sh
ln -sf ~/git/.gitconfig ~/.gitconfig

ln -sf ~/.dotfiles/nvim ~/.config/nvim
ln -sf ~/.dotfiles/alacritty ~/.config/alacritty

ln -sf ~/.dotfiles/hypr ~/.config/hypr
cd ~/.config/hypr
ln -sf hyprland-<device-name>.conf hyprland.conf
```
