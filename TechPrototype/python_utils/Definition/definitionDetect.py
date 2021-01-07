import cv2
import os


def getImageVar(imgPath):
    image = cv2.imread(imgPath)
    img2gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    imageVar = cv2.Laplacian(img2gray, cv2.CV_64F).var()
    return imageVar


def train(dirPath):
    fileList = os.listdir(dirPath)
    means = 0
    cnt = 0
    for item in fileList:
        filepath = dirPath + '/' + item
        means += getImageVar(filepath)
        cnt += 1
    means /= cnt
    return means


def test(imgPath, mean):
    score = getImageVar(imgPath)
    if score < mean:
        return False
    else:
        return True


if __name__ == "__main__":
    mean = train("/train")
    if test("test.jpg", mean):
        print("pass")



