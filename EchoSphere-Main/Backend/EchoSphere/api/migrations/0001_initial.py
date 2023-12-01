# Generated by Django 4.1.9 on 2023-09-19 10:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('aadhar', models.CharField(max_length=12)),
                ('contact', models.CharField(max_length=10)),
                ('password', models.CharField(max_length=100)),
                ('access', models.CharField(max_length=3)),
                ('dept', models.CharField(max_length=10)),
                ('lang', models.CharField(max_length=2)),
                ('api', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Worker',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('w_name', models.CharField(max_length=100)),
                ('contact', models.CharField(max_length=10)),
                ('status', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Grievances',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('priority', models.CharField(max_length=3)),
                ('dept', models.CharField(max_length=10)),
                ('status', models.CharField(max_length=10)),
                ('stage', models.SmallIntegerField()),
                ('usr_img', models.ImageField(default=None, upload_to='uploads/user')),
                ('wrk_img', models.ImageField(default=None, upload_to='uploads/worker')),
                ('lat', models.FloatField()),
                ('long', models.FloatField()),
                ('location', models.CharField(max_length=100)),
                ('summary', models.CharField(max_length=500)),
                ('uid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='u_grievances', to='api.user')),
                ('wid', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='w_grievances', to='api.worker')),
            ],
        ),
    ]
