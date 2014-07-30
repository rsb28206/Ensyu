/**
#############
webテンプレ
#############
1. undefinedは値ではなくグローバル変数なため書き換えができる
    => 確実にundefinedとなる書き方
2. 他のファイルに影響する可能性がある
    => 無闇にグローバルを汚染しないために即時関数で囲う
    => 関数内のみ適用されるstrictモードを使用
        => グローバルstrictは他の非strictコードに影響を与えてしまう
*/

(function(window, $, undefined) {
    "use strict";   // strictモードを使用


    // DOMの読み込みを待つ必要ない事前処理

    $(function() {
        // DOMの読み込みが完了した後に行う処理(initialize)
    });
}(this, jQuery));

/*
#############
競プロテンプレ
#############
1. 1ファイルしか使用しない
    => 他のファイルに影響しない
    => 即時関数で囲うメリットが少ない
        => 値が書き換えられないのでundefinedが保証されている
        => (可読性を損ねない)グローバル変数は使用出来る
        => グローバルstrictにしても影響がない
        => グローバルオブジェクトの名前解決の速度が上昇するくらい
2. 標準入力(Webではほぼ行わない)には別途処理が必要
    => 標準入力にはFileSystemモジュールのreadFileSync（同期読み込み）を使用
3. 打ち間違えによるバグを減らす
    => タイプ量を少なくする
        => 入出力関数を短く変数化
    => 標準入力をモジュールに包む
        => 関数は解釈時に巻き上げが起こるので実処理より下に書ける
        => 変数に代入すると実処理より上に書かなきゃいけないため（長くて）可読性が落ちる
    => 例外処理を入れて入れて異常入力や状態を検知、通知
*/
(function(stdin) {
    "use strict";

    var puts = console.log,
        p = require("util").print,
        cin = parseInput();

    // ここに処理を記述する

}(require("fs").readFileSync("/dev/stdin", "utf8")));

function parseInput(input, useSplitSpace) {
    var index = 0,
        ret = [],
        inputs = input.replace(/\r/g, '').split("\n");

    useSplitSpace = useSplitSpace || true;

    // 入力を改行/空白で区切り平坦な配列に変換
    inputs.forEach(function(val) {
        if ( useSplitSpace && val !== "" ) {
            val.split(" ").forEach(function(el) {
                if ( el !== "" ) ret.push(el);
            });
        } else {
            ret.push(val);
        }
    });

    return {
        hasNext: function(val) {
            if ( typeof val === "undefined" ) {
                return typeof ret[index] !== "undefined";
            } else {
                return ret[index] === val;
            }
        },
        next: function() {
            if ( typeof ret[index+1] === "undefined" ) throw new RangeError("Index out of bounds at '" + index+1 + "'");
            return ret[index++];
        },
        nextNumber: function () {
            if ( !/^\d+$/.test(this.top()) ) throw new TypeError("'" + this.top() + "' cannot convet to Number");
            return +this.next();
        },
        nextInt: function() {
            return parseInt(this.nextNumber());
        },
        top: function() {
            return ret[index];
        },
        rewind: function() {
            index = 0;
        }
    };
}


