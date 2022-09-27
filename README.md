![badge](https://img.shields.io/github/issues/kuone314/VSCodeOpenFilesFromClipboard)
![badge](https://img.shields.io/github/forks/kuone314/VSCodeOpenFilesFromClipboard)
![badge](https://img.shields.io/github/stars/kuone314/VSCodeOpenFilesFromClipboard)

# Open files from clipboard


## Usage

*	Copy file or folder path, and execut command.  
  ファイルやフォルダのパスをコピーし、コマンドを実行して下さい。

<!-- # Usage example

* ファイラからパスをコピーして、開く
  * エクスプローラ(Windows標準ファイラ)からは、Shift+右クリックで、フルパスのコピーが行なえます。
* TortoiseGit で、差分のパスをコピー
* ファイルリストを、ブックマークとして使う。 -->

## Note

* For open multiple files, divide file pathes into multiple lines as below.  
  複数のファイルを開く場合は、以下の様に複数行に分けた物をコピーして下さい。
```
C:/foo.txt
C:/bar.txt
D:/foo/bar.txt
```

* Files open in active window. Folder open in new window.  
  ファイルは現在のウインドウで開きます。フォルダは新規ウインドウで開きます。
* Only full path is supported. Relative path is not supported.
 パスはフルパスを指定して下さい。相対パスは、現状は未対応です。



## Commands
* `open-files-from-clipboard`
  * Open files from clipboard.
  * Default shortcut: none.
