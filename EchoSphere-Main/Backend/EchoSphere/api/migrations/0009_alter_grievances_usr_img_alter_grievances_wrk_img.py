# Generated by Django 4.1.9 on 2023-09-22 17:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_grievances_usr_img_alter_grievances_wrk_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='grievances',
            name='usr_img',
            field=models.ImageField(blank=True, default=None, null=True, upload_to='D:\\Project\\EchoSphere-Main\\Backend\\EchoSphere\\api\\media\\uploads\\user'),
        ),
        migrations.AlterField(
            model_name='grievances',
            name='wrk_img',
            field=models.ImageField(blank=True, default=None, null=True, upload_to='D:\\Project\\EchoSphere-Main\\Backend\\EchoSphere\\api\\media\\uploads\\worker'),
        ),
    ]
