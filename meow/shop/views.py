from django.shortcuts import render
from .models import Product
from math import ceil
# Create your views here.
def index(request):
    products = Product.objects.all()
    product_cat = Product.objects.values('category')
    # print(product_cat)
    cat_list = {item['category'] for item in product_cat }
    products = []
    for item in cat_list:
        prod = Product.objects.filter(category=item)
        products.append(prod)
    for product in products:
        for prod in product:
            print(prod.product_name)

    return render(request, 'shop/index.html', {'products': products})



# EXPLANATION
# 1. for getting the items according to the category, the names of categories are fetched by product_cat
# 2. all the items of the respective categories are fetch as lists by for loop and filtering out and then appended in another list named products.
# 3. running for loop on products give different lists and iterating another for loop over each product list of product gives the individual products



def productPage(request, id):
    products = Product.objects.all()
    product = Product.objects.filter(id=id);
    print(product)
    return render(request, 'shop/productPage.html',{"product": product[0]} )