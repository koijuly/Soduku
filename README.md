# Soduku

Open the file with your prefered browser.
Left-click to select an answer, right-click to dismiss or bring back answers as options for that square.
There is a seed-box under the buttons that can be used to export/import seeds.
This comes with a demo puzzle for each side that is loaded when you choose that size.

Below is a basic overview of the buttons as they stand. Eventually, I hope to implement these in a menu with hover tooltips. the 'Tests' section will be removed


- Reset Grid: Removes any pencil marked square; any that have been marked final remain
- Update Pencil Marks: allows you to get the program to go through the grid and remove any impossible answers based on your current answers
- Mark Final: turns your given answers into black unchangeable answers so long as they are not clashing with other squares
- Empty Grid: Gives you an empty grid - can be used if you want to play a puzzle from another source
- Import grid: From a seed is in the text box below generates that grid.

New Grid creates a grid and then runs several 'make holes' based on the number you pick and the comparative size of the game grid (1 in small is 1, 1 in Normal is 2, 1 in large is 3).

Puzzle size Changes the size of the game grid. Currently supports 4x4, 9x9 and 16x16. Whenever you change size a demo grid is loaded.

Tests:
-  Answer Grid - console gets the array of stored answers
-  Complete Grid - Randomly generates a filled-in grid
-  Make Holes in Grid - attempts to remove answers, while maintaining one solution
