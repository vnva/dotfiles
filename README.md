# 🎲 vnva's dotfiles

![Screenshot](/screenshot.png)

## Usage

Clone the repository

```sh
git clone --recurse-submodules git@github.com:vnva/dotfiles.git ~/.dotfiles
```

Link the dotfiles

```sh
ln -sf ~/.dotfiles/zsh/.zshrc ~/.zshrc
ln -sf ~/.dotfiles/git/.gitconfig ~/.gitconfig
ln -sf ~/.dotfiles/nvim ~/.config/nvim
ln -sf ~/.dotfiles/alacritty ~/.config/alacritty
ln -sf ~/.dotfiles/hypr ~/.config/hypr
```

Modules

- [nvim](/nvim/)
- [hypr (hyprland, hyprpaper)](/hypr/)

## Thank you very much

- Systems: [Arch Linux](https://archlinux.org), [Artix Linux](https://artixlinux.org)
- Wayland compositor: [Hyprland](https://hyprland.org)
- Terminal emulator: [Alacritty](https://alacritty.org)
- Shell: [zsh](https://www.zsh.org)
- Shell prompt: [starship](https://starship.rs/)
- Text editor: [Neovim](https://neovim.io)
- Font: [Iosevka](https://typeof.net/Iosevka)
- Multimedia framework: [Pipewire](https://pipewire.org)
- Bar: [Waybar](https://github.com/Alexays/Waybar)
- App launcher: [Wofi](https://hg.sr.ht/~scoopta/wofi)

## Plans

- Add scripts
- Add Wofi configuration
- Add Waybar configuration for each devices
- Add Ansible playbooks for devices
