from aip import AipOcr
import os, base64
import sys

APP_ID = '23500047'
API_KEY = "1O3fzqDF8umasbiWGlpHwcqD"
SECRET_KEY = "BQsb2WMX8VMPfD9Vb3zn1LizKYqDuGH1"

client = AipOcr(APP_ID, API_KEY, SECRET_KEY)


def get_file_content(filePath):
    """ 读取图片 """
    with open(filePath, 'rb') as fp:
        return fp.read()


def ConvertToTextByBase64(base):
    if "base64," in base:
        i = base.index("base64,") + 7
        newbase = base[i:]
    else:
        newbase = base
    imgdata = base64.b64decode(newbase)
    result = client.basicGeneral(imgdata)
    result = result["words_result"]
    final_result = ""
    for x in result:
        words = x["words"]
        final_result += words
    return final_result


def ConvertToTextByImg(path):
    image = get_file_content(path)  # 填入本地图片位置
    result = client.basicGeneral(image)
    result = result["words_result"]
    final_result = ""
    for x in result:
        words = x["words"]
        final_result += words
    return final_result


if __name__ == '__main__':
    ConvertToTextByBase64(sys.argv[1])
