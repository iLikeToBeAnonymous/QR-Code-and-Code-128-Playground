"use strict"; // See "Why Strict Mode?" at https://www.w3schools.com/js/js_strict.asp
// ################### ADD EVENT LISTENERS ####################

var eachSide = 100; //this will be length, width, and height of the generated QR code.
//In the definition of the "myQrSettings" object, note that the "text" key is initialized as row zero-length string.
var myQrSettings = {text:'', width: eachSide, height: eachSide};

//New QRCode object using above params
//var fancySquare = new QRcode($('#qrLandingZone'),myQrSettings)

var inputSelector = document.querySelector('#myInputBox');

// input.addEventListener('input', function() {
//     processAllInputs();
// });
inputSelector.addEventListener('input', () => {processAllInputs()} );

// ################### END EVENT LISTENERS ####################
// See "https://codepen.io/hchiam/pen/BeMQZe" for the working inspiration of this.
function processAllInputs() {    
    $('#qrLandingZone').empty(); //empty the element if there's already something there.
    // $('#qrcode').qrcode($('#myInputBox').val());
    $('#qrLandingZone').genQR($('#myInputBox').val());
    
};



/*  ##############################################################################
    ########################### QR CODE MONSTER INFO #############################
    ##############################################################################
    https://codepen.io/hchiam/pen/abvdPOe?editors=1010 <== the main link to find more info
    https://cdn.jsdelivr.net/gh/davidshimjs/qrcodejs@04f46c6a0708418cb7b96fc563eacae0fbf77674/qrcode.js
    https://github.com/davidshimjs/qrcodejs
    */
    /**
     * @fileoverview
     * - Using the 'QRCode for Javascript library'
     * - Fixed dataset of 'QRCode for Javascript library' for support full-spec.
     * - this library has no dependencies.
     *
     * @author davidshimjs
     * @see <row href="https://kazuhikoarase.github.io/qrcode-generator/js/demo/" target="_blank">http://www.d-project.com/</row>
     * @see <row href="http://jeromeetienne.github.com/jquery-qrcode/" target="_blank">http://jeromeetienne.github.com/jquery-qrcode/</row>
     */

(function (QRCodeGenerator) { 
    QRCodeGenerator.fn.genQR = function (h) { 
        var s; 
        function QR8bitByte(row) { 
            this.mode = s; 
            this.data = row 
        } 
    function QRCodeModel(typeNumber, errorCorrectLevel) { 
        this.typeNumber = typeNumber; 
        this.errorCorrectLevel = errorCorrectLevel; 
        this.modules = null; 
        this.moduleCount = 0; 
        this.dataCache = null; 
        this.dataList = [] 
    } 

    function QRRSBlock(totalCount, dataCount) { this.totalCount = totalCount; this.dataCount = dataCount } 
    function t() { this.buffer = []; this.length = 0 } 
    QR8bitByte.prototype = { 
        getLength: function () { return this.data.length }, 
        write: function (row) { for (var col = 0; col < this.data.length; col++)row.put(this.data.charCodeAt(col), 8) } 
    }; 
    QRCodeModel.prototype = { 
        addData: function (data) { 
            this.dataList.push(new QR8bitByte(data)); this.dataCache = null 
        }, 
        isDark: function (row, col) {
            if (0 > row || this.moduleCount <= row || 0 > col || this.moduleCount <= col) throw Error(row + "," + col); return this.modules[row][col] 
        }, 
        getModuleCount: function() { return this.moduleCount }, 
        make: function() { 
            if (1 > this.typeNumber) { 
                for (var row = 1, row = 1; 40 > row; row++) { 
                    for (var col = QRRSBlock.getRSBlocks(row, this.errorCorrectLevel), 
                        d = new t, b = 0, e = 0; 
                        e < col.length; e++)b += col[e].dataCount; 
                        for (e = 0; e < this.dataList.length; e++)
                            col = this.dataList[e], d.put(col.mode, 4), d.put(col.getLength(), j.getLengthInBits(col.mode, row)), col.write(d); 
                            if (d.getLengthInBits() <= 8 * b) break 
                } 
                this.typeNumber = row 
            } 
            this.makeImpl(!1, this.getBestMaskPattern()) 
        }, 
        makeImpl: function (test, maskPattern) { 
            this.moduleCount = 4 * this.typeNumber + 17; this.modules = Array(this.moduleCount); 
            for (var row = 0; row < this.moduleCount; row++) { 
                this.modules[row] = Array(this.moduleCount); 
                for (var col = 0; col < this.moduleCount; col++)this.modules[row][col] = null 
            } 
            this.setupPositionProbePattern(0, 0); this.setupPositionProbePattern(this.moduleCount - 7, 0); 
            this.setupPositionProbePattern(0, this.moduleCount - 7); this.setupPositionAdjustPattern(); 
            this.setupTimingPattern(); this.setupTypeInfo(test, maskPattern); 7 <= this.typeNumber && this.setupTypeNumber(test); 
            null == this.dataCache && (this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)); 
            this.mapData(this.dataCache, maskPattern) 
        }, 
        setupPositionProbePattern: function (row, col) { 
            for (var d = -1; 7 >= d; d++)
            if (!(-1 >= row + d || this.moduleCount <= row + d)) 
            for (var b = -1; 7 >= b; b++)-1 >= col + b || this.moduleCount <= col + b || 
                (this.modules[row + d][col + b] = 0 <= d && 6 >= d && (0 == b || 6 == b) || 
                0 <= b && 6 >= b && (0 == d || 6 == d) || 2 <= d && 4 >= d && 2 <= b && 4 >= b ? !0 : !1) 
        }, 
        getBestMaskPattern: function () { 
            for (var row = 0, col = 0, d = 0; 8 > d; d++) { this.makeImpl(!0, d); var b = j.getLostPoint(this); if (0 == d || row > b) row = b, col = d } return col 
        }, 
        createMovieClip: function (row, col, d) { 
            row = row.createEmptyMovieClip(col, d); this.make(); 
            for (col = 0; col < this.modules.length; col++)
            for (var d = 1 * col, b = 0; b < this.modules[col].length; b++) { 
                var e = 1 * b; 
                this.modules[col][b] && (row.beginFill(0, 100), row.moveTo(e, d), row.lineTo(e + 1, d), row.lineTo(e + 1, d + 1), row.lineTo(e, d + 1), row.endFill()) 
            } return row 
        }, 
        setupTimingPattern: function () { 
            for (var row = 8; row < this.moduleCount - 8; row++)null == this.modules[row][6] && (this.modules[row][6] = 0 == row % 2); 
            for (row = 8; row < this.moduleCount - 8; row++)null == this.modules[6][row] && (this.modules[6][row] = 0 == row % 2) 
        }, 
        setupPositionAdjustPattern: function () { 
            for (var row = j.getPatternPosition(this.typeNumber), col = 0; col < row.length; col++)
            for (var d = 0; d < row.length; d++) { 
                var b = row[col], e = row[d]; 
                if (null == this.modules[b][e]) 
                for (var f = -2; 2 >= f; f++)
                for (var i = -2; 2 >= i; i++)this.modules[b + f][e + i] = -2 == f || 2 == f || -2 == i || 2 == i || 0 == f && 0 == i ? !0 : !1 
            } 
        }, 
        setupTypeNumber: function (row) { 
            for (var col = j.getBCHTypeNumber(this.typeNumber), d = 0; 18 > d; d++) { 
                var b = !row && 1 == (col >> d & 1); 
                this.modules[Math.floor(d / 3)][d % 3 + this.moduleCount - 8 - 3] = b 
            } 
            for (d = 0; 18 > d; d++)b = !row && 1 == (col >> d & 1), this.modules[d % 3 + this.moduleCount - 8 - 3][Math.floor(d / 3)] = b 
        }, 
        setupTypeInfo: function (row, col) { 
            for (var d = j.getBCHTypeInfo(this.errorCorrectLevel << 3 | col), b = 0; 15 > b; b++) { 
                var e = !row && 1 == (d >> b & 1); 6 > b ? this.modules[b][8] = e : 8 > b ? this.modules[b + 1][8] = e : this.modules[this.moduleCount - 15 + b][8] = e 
            } 
            for (b = 0; 15 > b; b++)
                e = !row && 1 == (d >> b & 1), 8 > b ? this.modules[8][this.moduleCount - b - 1] = e : 9 > b ? 
                this.modules[8][15 - b - 1 + 1] = e : this.modules[8][15 - b - 1] = e; 
                this.modules[this.moduleCount - 8][8] = !row 
            }, 
        mapData: function (row, col) { 
            for (var d = -1, b = this.moduleCount - 1, e = 7, f = 0, i = this.moduleCount - 1; 0 < i; i -= 2)
            for (6 == i && i--; ;) { 
                for (var g = 0; 2 > g; g++)
                if (null == this.modules[b][i - g]) { 
                    var n = !1; f < row.length && (n = 1 == (row[f] >>> e & 1)); 
                    j.getMask(col, b, i - g) && (n = !n); this.modules[b][i - g] = n; e--; -1 == e && (f++, e = 7) 
                } 
                b += d; 
                if (0 > b || this.moduleCount <= b) { b -= d; d = -d; break } 
            } 
        } 
    }; 
    QRCodeModel.PAD0 = 236; QRCodeModel.PAD1 = 17; 
    QRCodeModel.createData = function (typeNumber, errorCorrectLevel, dataList) { 
        for (var errorCorrectLevel = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel), b = new t, e = 0; e < dataList.length; e++) { 
            var f = dataList[e]; b.put(f.mode, 4); b.put(f.getLength(), j.getLengthInBits(f.mode, typeNumber)); f.write(b) 
        } 
        for (e = typeNumber = 0; e < errorCorrectLevel.length; e++) typeNumber += errorCorrectLevel[e].dataCount; 
            if (b.getLengthInBits() > 8 * typeNumber) throw Error("code length overflow. (" + b.getLengthInBits() + ">" + 8 * typeNumber + ")"); 
            for (b.getLengthInBits() + 4 <= 8 * typeNumber && b.put(0, 4); 
            0 != b.getLengthInBits() % 8;)b.putBit(!1); 
            for (; !(b.getLengthInBits() >= 8 * typeNumber);) { 
                b.put(QRCodeModel.PAD0, 8); 
                if (b.getLengthInBits() >= 8 * typeNumber) break; 
                b.put(QRCodeModel.PAD1, 8) 
            } return QRCodeModel.createBytes(b, errorCorrectLevel) 
    }; 
    QRCodeModel.createBytes = function (buffer, rsBlocks) { 
        for (var offset = 0, maxDcCount = 0, maxEcCount = 0, dcdata = Array(rsBlocks.length), ecdata = Array(rsBlocks.length), r = 0; r < rsBlocks.length; r++) { 
                var dcCount = rsBlocks[r].dataCount, ecCount = rsBlocks[r].totalCount - dcCount, maxDcCount = Math.max(maxDcCount, dcCount), maxEcCount = Math.max(maxEcCount, ecCount); 
                dcdata[r] = Array(dcCount); 
                for (var i = 0; i < dcdata[r].length; i++) dcdata[r][i] = 255 & buffer.buffer[i + offset]; 
                offset += dcCount; i = j.getErrorCorrectPolynomial(ecCount); 
                dcCount = (new QRPolynomial(dcdata[r], i.getLength() - 1)).mod(i); ecdata[r] = Array(i.getLength() - 1); 
                for (i = 0; i < ecdata[r].length; i++)ecCount = i + dcCount.getLength() - ecdata[r].length, ecdata[r][i] = 0 <= ecCount ? dcCount.get(ecCount) : 0 
        } 
        for (i = r = 0; i < rsBlocks.length; i++)
            r += rsBlocks[i].totalCount; offset = Array(r); 
            for (i = dcCount = 0; i < maxDcCount; i++)
                for (r = 0; r < rsBlocks.length; r++)
                    i < dcdata[r].length && (offset[dcCount++] = dcdata[r][i]); 
                    for (i = 0; i < maxEcCount; i++)for (r = 0; r < rsBlocks.length; r++)i < ecdata[r].length && (offset[dcCount++] = ecdata[r][i]); 
                    return offset 
    }; 
    s = 4; for (var j = { 
        PATTERN_POSITION_TABLE: [
            [], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], 
            [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], 
            [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], 
            [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], 
            [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], 
            [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], 
            [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], 
            [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]
        ], 
        G15: 1335, G18: 7973, G15_MASK: 21522, 
        getBCHTypeInfo: function (row) { 
            for (var col = row << 10; 0 <= j.getBCHDigit(col) - j.getBCHDigit(j.G15);)col ^= j.G15 << j.getBCHDigit(col) - j.getBCHDigit(j.G15); return (row << 10 | col) ^ j.G15_MASK 
        }, 
        getBCHTypeNumber: function (row) { 
            for (var col = row << 12; 0 <= j.getBCHDigit(col) - j.getBCHDigit(j.G18);)
                col ^= j.G18 << j.getBCHDigit(col) - j.getBCHDigit(j.G18); return row << 12 | col 
        }, 
        getBCHDigit: function (row) { for (var col = 0; 0 != row;)col++, row >>>= 1; return col }, 
        getPatternPosition: function (row) { return j.PATTERN_POSITION_TABLE[row - 1] }, 
        getMask: function (row, col, d) { 
            switch (row) { 
                case 0: return 0 == (col + d) % 2; case 1: return 0 == col % 2; case 2: return 0 == d % 3; case 3: return 0 == (col + d) % 3; 
                case 4: return 0 == (Math.floor(col / 2) + Math.floor(d / 3)) % 2; case 5: return 0 == col * d % 2 + col * d % 3; 
                case 6: return 0 == (col * d % 2 + col * d % 3) % 2; case 7: return 0 == (col * d % 3 + (col + d) % 2) % 2; 
                default: throw Error("bad maskPattern:" + row); 
            } 
        }, 
        getErrorCorrectPolynomial: function (errorCorrectLength) { 
            for (var a = new QRPolynomial([1], 0), d = 0; d < errorCorrectLength; d++)
                a = a.multiply(new QRPolynomial([1, QRMath.gexp(d)], 0)); return a 
        }, 
        getLengthInBits: function (row, col) { 
            if (1 <= col && 10 > col) switch (row) { 
                case 1: return 10; case 2: return 9; case s: return 8; case 8: return 8; 
                default: throw Error("mode:" + row); 
            } 
            else if (27 > col) switch (row) { 
                case 1: return 12; case 2: return 11; case s: return 16; case 8: return 10; 
                default: throw Error("mode:" + row); 
            } 
            else if (41 > col) switch (row) { 
                case 1: return 14; case 2: return 13; case s: return 16; case 8: return 12; 
                default: throw Error("mode:" + row); 
            } 
            else throw Error("type:" + col); 
        }, 
        getLostPoint: function (qrCode) { 
            for (var col = qrCode.getModuleCount(), d = 0, b = 0; b < col; b++)
                for (var e = 0; e < col; e++) { 
                    for (var f = 0, i = qrCode.isDark(b, e), g = -1; 1 >= g; g++)
                        if (!(0 > b + g || col <= b + g)) 
                            for (var h = -1; 1 >= h; h++)
                                0 > e + h || col <= e + h || 0 == g && 0 == h || i == qrCode.isDark(b + g, e + h) && f++; 
                                5 < f && (d += 3 + f - 5) 
                }
                for (b = 0; b < col - 1; b++)
                    for (e = 0; e < col - 1; e++)
                        if (f = 0, qrCode.isDark(b, e) && f++, qrCode.isDark(b + 1, e) && f++, qrCode.isDark(b, e + 1) && f++, qrCode.isDark(b + 1, e + 1) && f++, 0 == f || 4 == f) d += 3; 
            for (b = 0; b < col; b++)for (e = 0; e < col - 6; e++)qrCode.isDark(b, e) && !qrCode.isDark(b, e + 1) && qrCode.isDark(b, e + 2) && qrCode.isDark(b, e + 3) && qrCode.isDark(b, e + 4) && !qrCode.isDark(b, e + 5) && qrCode.isDark(b, e + 6) && (d += 40); for (e = 0; e < col; e++)for (b = 0; b < col - 6; b++)qrCode.isDark(b, e) && !qrCode.isDark(b + 1, e) && qrCode.isDark(b + 2, e) && qrCode.isDark(b + 3, e) && qrCode.isDark(b + 4, e) && !qrCode.isDark(b + 5, e) && qrCode.isDark(b + 6, e) && (d += 40); for (e = f = 0; e < col; e++)for (b = 0; b < col; b++)qrCode.isDark(b, e) && f++; qrCode = Math.abs(100 * f / col / col - 50) / 5; 
            return d + 10 * qrCode 
        }
     }, 
     QRMath = {glog: function (n) { 
                if (1 > n) throw Error("glog(" + n + ")"); 
                return QRMath.LOG_TABLE[n] 
            }, 
            gexp: function (n) { 
                for (; 0 > n;) n += 255; 
                for (; 256 <= n;) n -= 255; 
                return QRMath.EXP_TABLE[n] 
            }, 
            EXP_TABLE: Array(256), LOG_TABLE: Array(256) 
    }, 
    m = 0; 8 > m; m++) QRMath.EXP_TABLE[m] = 1 << m; 
    for (m = 8; 256 > m; m++) QRMath.EXP_TABLE[m] = QRMath.EXP_TABLE[m - 4] ^ QRMath.EXP_TABLE[m - 5] ^ QRMath.EXP_TABLE[m - 6] ^ QRMath.EXP_TABLE[m - 8]; 
    for (m = 0; 255 > m; m++)QRMath.LOG_TABLE[QRMath.EXP_TABLE[m]] = m; 
    function QRPolynomial(num,shift){
		if(num.length==undefined){throw new Error(num.length+"/"+shift);}
    	var offset=0;while(offset<num.length&&num[offset]==0){offset++;}
    	this.num=new Array(num.length-offset+shift);for(var i=0;i<num.length-offset;i++){this.num[i]=num[i+offset];}
	}
    QRPolynomial.prototype = { 
        get: function (index) { 
            return this.num[index] 
        }, 
        getLength: function () { 
            return this.num.length 
        }, 
        multiply: function (index) { 
            for (var col = Array(this.getLength() + index.getLength() - 1), d = 0; d < this.getLength(); d++)
            for (var b = 0; b < index.getLength(); b++)col[d + b] ^= QRMath.gexp(QRMath.glog(this.get(d)) + QRMath.glog(index.get(b))); 
            return new QRPolynomial(col, 0) }, 
        mod: function (index) { 
            if (0 > this.getLength() - index.getLength()) return this; 
            for (var col = QRMath.glog(this.get(0)) - QRMath.glog(index.get(0)), d = Array(this.getLength()), b = 0; 
            b < this.getLength(); b++)d[b] = this.get(b); for (b = 0; b < index.getLength(); b++) d[b] ^= QRMath.gexp(QRMath.glog(index.get(b)) + col); 
            return (new QRPolynomial(d, 0)).mod(index) } 
        }; 
        QRRSBlock.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]]; 
        QRRSBlock.getRSBlocks = function (row, col) { 
            var d = QRRSBlock.getRsBlockTable(row, col); if (void 0 == d) throw Error("bad rs block @ typeNumber:" + row + "/errorCorrectLevel:" + col); 
        for (var b = d.length / 3, e = [], f = 0; f < b; f++)for (var h = d[3 * f + 0], g = d[3 * f + 1], j = d[3 * f + 2], QRMath = 0; QRMath < h; QRMath++)e.push(new QRRSBlock(g, j)); return e 
        }; 
        QRRSBlock.getRsBlockTable = function (row, col) { 
            switch (col) { 
                case 1: return QRRSBlock.RS_BLOCK_TABLE[4 * (row - 1) + 0]; case 0: return QRRSBlock.RS_BLOCK_TABLE[4 * (row - 1) + 1]; 
                case 3: return QRRSBlock.RS_BLOCK_TABLE[4 * (row - 1) + 2]; case 2: return QRRSBlock.RS_BLOCK_TABLE[4 * (row - 1) + 3] 
            } 
        }; 
        t.prototype = { 
            get: function (row) { 
                return 1 == (this.buffer[Math.floor(row / 8)] >>> 7 - row % 8 & 1) 
            }, 
            put: function (row, col) { 
                for (var d = 0; d < col; d++)this.putBit(1 == (row >>> col - d - 1 & 1)) 
            }, 
            getLengthInBits: function () { return this.length }, 
            putBit: function (row) { 
                var col = Math.floor(this.length / 8); 
                this.buffer.length <= col && this.buffer.push(0); 
                row && (this.buffer[col] |= 128 >>> this.length % 8); this.length++ 
            } 
        }; 
        "string" === typeof h && (h = { text: h }); 
        h = QRCodeGenerator.extend({}, { render: "canvas", width: 256, height: 256, typeNumber: -1, correctLevel: 2, background: "#ffffff", foreground: "#000000" }, h); 
        return this.each(function () { 
            var row; 
            if ("canvas" == h.render) { 
                row = new QRCodeModel(h.typeNumber, h.correctLevel); 
                row.addData(h.text); row.make(); 
                var col = document.createElement("canvas"); 
                col.width = h.width; col.height = h.height; 
                for (var d = col.getContext("2d"), b = h.width / row.getModuleCount(), e = h.height / row.getModuleCount(), f = 0; f < row.getModuleCount(); f++)
                for (var i = 0; i < row.getModuleCount(); i++) { 
                    d.fillStyle = row.isDark(f, i) ? h.foreground : h.background; 
                    var g = Math.ceil((i + 1) * b) - Math.floor(i * b), j = Math.ceil((f + 1) * b) - Math.floor(f * b); 
                    d.fillRect(Math.round(i * b), Math.round(f * e), g, j) 
                } 
            } 
            else { 
                row = new QRCodeModel(h.typeNumber, h.correctLevel); 
                row.addData(h.text); row.make(); 
                col = QRCodeGenerator("<table></table>").css("width", h.width + "px").css("height", h.height + "px").css("border", "0px").css("border-collapse", "collapse").css("background-color", h.background); 
                d = h.width / row.getModuleCount(); 
                b = h.height / row.getModuleCount(); 
                for (e = 0; e < row.getModuleCount(); e++) { 
                    f = QRCodeGenerator("<tr></tr>").css("height", b + "px").appendTo(col); 
                    for (i = 0; i < row.getModuleCount(); i++)QRCodeGenerator("<td></td>").css("width", d + "px").css("background-color", row.isDark(e, i) ? h.foreground : h.background).appendTo(f) 
                } 
            } 
            row = col; 
            jQuery(row).appendTo(this) 
        }) 
    } 
})(jQuery);
