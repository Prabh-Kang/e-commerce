from django.db import models

# Create your models here.
class Product(models.Model):
    product_id = models.AutoField
    product_name = models.CharField(max_length = 100, default = "")
    product_description = models.CharField(max_length = 400, default = "")
    publish_date = models.DateField()
    category = models.CharField(max_length = 50, default = "")
    sub_category = models.CharField(max_length = 50, default = "")
    product_img = models.ImageField(upload_to = "shop/image" , default = "")
    product_price = models.FloatField(max_length=20, default=0.00)
    def __str__(self):
        return self.product_name