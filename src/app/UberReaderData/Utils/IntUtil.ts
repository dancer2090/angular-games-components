/*
  Copyright (c) 2008, Adobe Systems Incorporated
  All rights reserved.

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are
  met:

  * Redistributions of source code must retain the above copyright notice,
    this list of conditions and the following disclaimer.

  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the
    documentation and/or other materials provided with the distribution.

  * Neither the name of Adobe Systems Incorporated nor the names of its
    contributors may be used to endorse or promote products derived from
    this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
  IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
  THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
  PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

//import Endian = flash.utils.Endian;

/**
 * Contains reusable methods for operations pertaining
 * to int values.
 */
export class IntUtil {

    /**
     * Rotates x left n bits
     *
     * @langversion ActionScript 3.0
     * @playerversion Flash 9.0
     * @tiptext
     */
    public static rol ( x:number, n:number ):number {
        return ( x << n ) | ( x >>> ( 32 - n ) );
    }

    /**
     * Rotates x right n bits
     *
     * @langversion ActionScript 3.0
     * @playerversion Flash 9.0
     * @tiptext
     */
    public static ror ( x:number, n:number ):number {
        var nn:number = 32 - n;
        return ( x << nn ) | ( x >>> ( 32 - nn ) );
    }

    /** string for quick lookup of a hex character based on index */
    private static hexChars:string = "0123456789abcdef";

    /**
     * Outputs the hex value of a int, allowing the developer to specify
     * the endinaness in the process.  Hex output is lowercase.
     *
     * @param n The int value to output as hex
     * @param bigEndian Flag to output the int as big or little endian
     * @return A string of length 8 corresponding to the
     *		hex representation of n ( minus the leading "0x" )
     * @langversion ActionScript 3.0
     * @playerversion Flash 9.0
     * @tiptext
     */
    public static toHex( n:number, bigEndian:boolean = false ):string {
        var s:string = "";

        if ( bigEndian ) {
            for ( var i:number = 0; i < 4; i++ ) {
                s += IntUtil.hexChars.charAt( ( n >> ( ( 3 - i ) * 8 + 4 ) ) & 0xF )
                    + IntUtil.hexChars.charAt( ( n >> ( ( 3 - i ) * 8 ) ) & 0xF );
            }
        } else {
            for ( var x:number = 0; x < 4; x++ ) {
                s += IntUtil.hexChars.charAt( ( n >> ( x * 8 + 4 ) ) & 0xF )
                    + IntUtil.hexChars.charAt( ( n >> ( x * 8 ) ) & 0xF );
            }
        }

        return s;
    }
}
