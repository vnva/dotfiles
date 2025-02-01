export ZDOTDIR=~/dotfiles/roles/zsh/files
export EDITOR=nvim

source $HOME/dotfiles/roles/zsh/files/variables.sh

export PATH="$HOME/.local/bin:$PATH"
export PATH="$HOME/dotfiles/bin:$PATH"
export TEMP_ZSH_DIR=~/.temp/zsh

# HISTORY
export HISTFILE=$HOME/.zsh_history
export HISTSIZE=10000
export SAVEHIST=10000

setopt EXTENDED_HISTORY       # Write the history file in the ':start:elapsed;command' format.
setopt INC_APPEND_HISTORY     # Write to the history file immediately, not when the shell exits.
setopt SHARE_HISTORY          # Share history between all sessions.
setopt HIST_EXPIRE_DUPS_FIRST # Expire a duplicate event first when trimming history.
setopt HIST_IGNORE_DUPS       # Do not record an event that was just recorded again.
setopt HIST_IGNORE_ALL_DUPS   # Delete an old recorded event if a new event is a duplicate.
setopt HIST_FIND_NO_DUPS      # Do not display a previously found event.
setopt HIST_IGNORE_SPACE      # Do not record an event starting with a space.
setopt HIST_SAVE_NO_DUPS      # Do not write a duplicate event to the history file.
setopt HIST_VERIFY            # Do not execute immediately upon history expansion.
setopt APPEND_HISTORY         # append to history file
setopt HIST_NO_STORE          # Don't store history commands

# PLUGINS
if [[ ! -d $TEMP_ZSH_DIR/antidote ]]; then
  git clone https://github.com/mattmc3/antidote $TEMP_ZSH_DIR/antidote
fi

zsh_plugins=$TEMP_ZSH_DIR/plugins
if [[ ! ${zsh_plugins}.zsh -nt ${ZDOTDIR}/plugins.txt ]]; then
  source $TEMP_ZSH_DIR/antidote/antidote.zsh
  antidote bundle <${ZDOTDIR}/plugins.txt >${zsh_plugins}.zsh
fi
source ${zsh_plugins}.zsh

# STANDALONE
# if [ ! -f $ZDOTDIR/.zshrc ]; then
#   touch $ZDOTDIR/.zshrc
# fi
# source $ZDOTDIR/.zshrc

# PRIVATE
if [ ! -f $ZDOTDIR/private.zsh ]; then
  touch $ZDOTDIR/private.zsh
fi
source $ZDOTDIR/private.zsh

# STARSHIP
eval "$(starship init zsh)"

autoload -U +X compinit && compinit
zstyle ':completion:*' format $'\e[2;37mCompleting %d\e[m'
source <(carapace _carapace)

# pnpm
export PNPM_HOME="/home/vnva/.local/share/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac
# pnpm end
