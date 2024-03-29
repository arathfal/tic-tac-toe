// JavaScript Document
import { checkWinner, renderBoard } from './functions.js';

$(document).ready(function () {
  const bootstrap_grid = 12;
  const X = 'X';
  const O = 'O';
  let size = 3;
  let count = 0;
  let o_win = 0;
  let x_win = 0;
  let span = `span${size}`;

  //funtion to render button with dynamic length .
  function renderButton(length = 9) {
    const contents = [];
    for (let i = 1; i <= length; i++) {
      contents.push(`<li id="button${i}" data-button="${i}" class="btn">+</li>`);
    }
    $('#game').html(contents.join(''));
  }

  //funtion to reset the board.
  function resetBoard(message) {
    $('#game li').text('+').removeClass('disable o x btn-primary btn-info');
    count = 0;
    if (message) {
      alert(message);
    }
  }

  //initial render
  renderButton();

  $('#reset').click(() => resetBoard());

  $('#size').change(function () {
    const newSize = Number($(this).val());
    const newSpan = `span${newSize}`;
    const isInc = newSize > size;

    const container = $('#tic-tac-toe');
    const title = $('#tic-tac-toe-title');
    const input = $('#tic-tac-toe-input');

    //12 is bootstrap span grid
    if (isInc) {
      if (newSize <= bootstrap_grid) {
        title.removeClass(span).addClass(newSpan);
        input.removeClass(span).addClass(newSpan);
        container.width($('.' + newSpan).width() + newSize * 2);
      } else {
        container.width('100%');
        $('.row').addClass('row-fluid').removeClass('row');
      }
    } else {
      if (newSize >= bootstrap_grid) {
        $('.row-fluid').addClass('row').removeClass('row-fluid');
      } else {
        title.removeClass(span).addClass(newSpan);
        input.removeClass(span).addClass(newSpan);
        container.width($('.' + newSpan).width() + newSize * 2);
      }
    }

    $('#game')
      .css('grid-template-columns', `repeat(${newSize}, 1fr)`)
      .css('grid-template-rows', `repeat(${newSize}, 1fr)`);

    size = newSize;
    span = newSpan;
    const length = Math.pow(size, 2);
    renderButton(length);

    $('#game li').click(function () {
      const buttons = $('[data-button]');
      const board = renderBoard(buttons);
      const winner_1 = checkWinner(size, board);

      if (!winner_1) {
        if ($(this).hasClass('disable')) {
          alert('Already selected');
        } else {
          const is_o_letter = count % 2 == 0;
          const text = is_o_letter ? O : X;
          const newClass = is_o_letter ? 'disable o btn-primary' : 'disable x btn-info';

          $(this).text(text).addClass(newClass);
          count++;

          const buttons = $('[data-button]');
          const board = renderBoard(buttons);
          const winner_2 = checkWinner(size, board);

          if (winner_2) {
            alert(`${winner_2} wins`);
            if (winner_2 === O) {
              o_win++;
              $('#o_win').text(o_win);
            } else {
              x_win++;
              $('#x_win').text(x_win);
            }
          }
        }
      } else if (count === length) {
        resetBoard('Its a tie. It will restart.');
      } else {
        resetBoard(`${winner_1} has won the game. Start a new game`);
      }
    });
  });
});
