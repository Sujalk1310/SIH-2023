from .models import User, Worker, Grievances
from django.http import JsonResponse, HttpResponseBadRequest
from  django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from sklearn.feature_extraction.text import CountVectorizer
from .NLP.nlp_runner import nlp_dept_detection
from django.core.files.base import ContentFile
from nltk.stem import WordNetLemmatizer
from nltk.corpus import stopwords
from django.conf import settings
import base64
import joblib
import requests
import json
import nltk
import uuid
import os

stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()
loaded_classifier = joblib.load(r'D:\Project\EchoSphere-Main\Backend\EchoSphere\api\NLP\nlp_dept.joblib')
loaded_vectorizer = joblib.load(r'D:\Project\EchoSphere-Main\Backend\EchoSphere\api\NLP\nlp_dept_vectorizer.joblib')

def fetch_image(data):
    image_path = os.path.join(settings.MEDIA_ROOT, str(data))
    with open(image_path, 'rb') as img_file:
        image_data = img_file.read()
        encoded_image = base64.b64encode(image_data).decode('utf-8')
        return encoded_image    

@csrf_exempt
def get_all_grievances(request):
    if request.method == 'GET':
        try:
            grievances = Grievances.objects.all().order_by("-date")
            # Serialize the queryset to JSON
            grievances_data = []
            for grievance in grievances:
                grievance_data = {
                    'gid': grievance.id,
                    'uid': grievance.uid.id,
                    'wid': grievance.wid.id if grievance.wid else None,
                    'date': grievance.date.strftime('%Y-%m-%d %H:%M:%S'),
                    'priority': grievance.priority,
                    'dept': grievance.dept,
                    'status': grievance.status,
                    'stage': grievance.stage,
                    'usr_img': fetch_image(grievance.usr_img) if grievance.usr_img else None,
                    'wrk_img': fetch_image(grievance.wrk_img) if grievance.wrk_img else None,
                    'lat': grievance.lat,
                    'long': grievance.long,
                    'location': grievance.location,
                    'summary': grievance.summary,
                }
                grievances_data.append(grievance_data)
            if len(grievances_data) == 0:
                grievances_data = None
        except Exception as e:
            print(e)
            grievances_data = None

        # Create a JSON response
        response_data = {'message': grievances_data}
        return JsonResponse(response_data)
    else :
        return HttpResponseBadRequest("Only accepts GET Requests!")

@csrf_exempt
def get_grievance_by_gid(request, id):
    if request.method == 'GET':
        try:
            grievance = Grievances.objects.get(id=id)
            grievance_data = {
                'gid': grievance.id,
                'uid': grievance.uid.id,
                'wid': grievance.wid.id if grievance.wid else None,
                'date': grievance.date.strftime('%Y-%m-%d %H:%M:%S'),
                'priority': grievance.priority,
                'dept': grievance.dept,
                'status': grievance.status,
                'stage': grievance.stage,
                'usr_img': fetch_image(grievance.usr_img) if grievance.usr_img else None,
                'wrk_img': fetch_image(grievance.wrk_img) if grievance.wrk_img else None,
                'lat': grievance.lat,
                'long': grievance.long,
                'location': grievance.location,
                'summary': grievance.summary,
            }
            if len(grievance_data) == 0:
                grievance_data = None
        except Exception as e:
            print(e)
            grievance_data = None

        response_data = {'message': grievance_data}
        return JsonResponse(response_data)
    else :
        return HttpResponseBadRequest("Only accepts GET Requests!")

@csrf_exempt
def get_grievances_by_uid(request, id):
    if request.method == 'GET':
        try:
            user = User.objects.get(id=id)
            access = user.access
            print(f"Access: {access}")  # Debugging: Check the access level
            if access == "usr":
                grievances = Grievances.objects.filter(uid=user).order_by("-date")
            else:
                print(f"Department: *{user.dept}*")  # Debugging: Check the department
                grievances = Grievances.objects.filter(dept=user.dept).order_by("-date")
                print(grievances.count())
            # Serialize the queryset to JSON
            grievances_data = []
            for grievance in grievances:
                grievance_data = {
                    'gid': grievance.id,
                    'uid': grievance.uid.id,
                    'wid': grievance.wid.id if grievance.wid else None,
                    'date': grievance.date.strftime('%Y-%m-%d %H:%M:%S'),
                    'priority': grievance.priority,
                    'dept': grievance.dept,
                    'status': grievance.status,
                    'stage': grievance.stage,
                    'usr_img': fetch_image(grievance.usr_img) if grievance.usr_img else None,
                    'wrk_img': fetch_image(grievance.wrk_img) if grievance.wrk_img else None,
                    'lat': grievance.lat,
                    'long': grievance.long,
                    'location': grievance.location,
                    'summary': grievance.summary,
                }
                grievances_data.append(grievance_data)
            if len(grievances_data) == 0:
                print("yup")
                grievances_data = None
        except Exception as e:
            grievances_data = str(e)

        # Create a JSON response
        response_data = {'message': grievances_data}
        return JsonResponse(response_data)
    else :
        return HttpResponseBadRequest("Only accepts GET Requests!")

@csrf_exempt
def register(request):
    if request.method=='POST':
        try:
            user_data = json.loads(request.body)
            name = user_data['name']
            aadhar = user_data['aadhar']
            contact = user_data['contact']
            password = user_data['password']
            lang = user_data['lang'] if user_data['lang'] is not None else "en" # None if not
            api = user_data['api']
            try:
                existing_user = User.objects.get(aadhar=aadhar)
                return HttpResponseBadRequest("User already exists!")
            except User.DoesNotExist:
                pass
            user = User(name=name, aadhar=aadhar, contact=contact, password=password, lang=lang, api=api)
            user.save()
            response_data = user.id
        except Exception as e:
            response_data = f"Error Occured: {e}"
        return JsonResponse({"message": response_data})
    else :
        return HttpResponseBadRequest("Only accepts POST Requests!")
    
@csrf_exempt
def logout(request):
    if request.method == 'GET':
        try:
            # if 'user_id' in request.session:
            #     del request.session['user_id']
            response_data = True
            return JsonResponse({"message": response_data})
        except Exception as e:
            return HttpResponseBadRequest("Cannot find user in session data!")
    else :
        return HttpResponseBadRequest("Only accepts GET Requests!")
    
@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            user_data = json.loads(request.body)
            aadhar = user_data['aadhar']
            password = user_data['password']
            user = User.objects.get(aadhar=aadhar)
            if user.password == password:
                response_data = user.id
            else:
                response_data = "Invalid aadhaar or password"
        except Exception as e:
            response_data = f"Error Occured: {e}"
            return HttpResponseBadRequest(response_data)
        return JsonResponse({"message": response_data})
    else :
        return HttpResponseBadRequest("Only accepts POST Requests!")
    
@csrf_exempt
def update_stage(request, id):
    if request.method == 'PUT':
        try:
            grievance = Grievances.objects.get(id=id)
            if grievance.stage == 4 and grievance.stage != 2:
                task_data = json.loads(request.body)
                if task_data['wrk_img'] is not None: # send json with None if not wrk_img
                    wrk_img = task_data['wrk_img']
                    wrk_img = base64.b64decode(wrk_img)
                    unique_filename = str(uuid.uuid4())
                    save_directory = r'D:\Project\EchoSphere-Main\Backend\EchoSphere\api\media\uploads\worker'
                    with open(save_directory + unique_filename + '.png', 'wb') as f:
                        f.write(wrk_img)
                    grievance.wrk_img = unique_filename + '.png'
                grievance.stage += 1
                grievance.status = "Completed"
                worker = Worker.objects.get(id=grievance.wid.id)
                worker.status = "AVA"
                worker.save()
            else :
                if grievance.stage < 5 and grievance.stage != 2:
                    grievance.stage += 1
                elif grievance.stage != 2:
                    return HttpResponseBadRequest("Already completed, cannot update!")
                else :
                    return HttpResponseBadRequest("User not at appropriate stage!") 
            grievance.save()
            user = User.objects.get(id=grievance.uid.id)
            if grievance.stage == 2:
                message = f"Your grievance - {grievance.id} status has been updated!! Stage - Reviewed"
            elif grievance.stage == 4:
                message = f"Your grievance - {grievance.id} status has been updated!! Stage - Task Done"
            elif grievance.stage == 5:
                message = f"Your grievance - {grievance.id} status has been updated!! Stage - Completed"
            response = requests.post(f"https://api.callmebot.com/whatsapp.php?phone=918445433348&text={message}&apikey=5958135")
            if response.status_code == 200:
                print("POST request was successful.")
                print("Response content:", response.text)
            else:
                print("POST request failed with status code:", response.status_code)
                print("Response content:", response.text)
            response_data = True
        except Exception as e:
            response_data = f"Error Occured: {e}"
            return HttpResponseBadRequest(response_data)
        return JsonResponse({"message": response_data})
    else :
        return HttpResponseBadRequest("Only accepts PUT Requests!")

@csrf_exempt    
def nlp_run(request):
    if request.method == 'POST':
        try:
            user_data = json.loads(request.body)
            summary = user_data['summary']
            response_data = nlp_dept_detection(nltk, summary, stop_words, lemmatizer, loaded_classifier, loaded_vectorizer)
        except Exception as e:
            response_data = f"Error Occured: {e}"
            return HttpResponseBadRequest(response_data)
        print(response_data)
        return JsonResponse({"message": response_data})
    else:
        return HttpResponseBadRequest("Only accepts POST Requests!")
    
@csrf_exempt
def get_worker_by_dept(request, id):
    if request.method == 'GET':
        try:
            user = User.objects.get(id=id)
            access = user.access
            if (access == "adm"):
                workers = Worker.objects.filter(dept=user.dept, status="AVA")
                workers_data = []
                for worker in workers:
                    worker_data = {
                        'id': worker.id,
                        'name': worker.w_name,
                        'contact': worker.contact,
                        'status': worker.status
                    }
                workers_data.append(worker_data)
                if len(workers_data) == 0:
                    workers_data = None
            else :
                return HttpResponseBadRequest("Not an authorized operation!")
            # Serialize the queryset to JSON
        except Exception as e:
            print(e)
            workers_data = None

        # Create a JSON response
        response_data = {'message': workers_data}
        return JsonResponse(response_data)
    else :
        return HttpResponseBadRequest("Only accepts GET Requests!")

@csrf_exempt
def worker_login(request):
    if request.method == 'POST':
        try:
            worker_data = json.loads(request.body)
            aadhar = worker_data['aadhar']
            password = worker_data['password']
            worker = Worker.objects.get(aadhar=aadhar)
            if worker.password == password:
                response_data = worker.id
            else:
                response_data = "Invalid aadhaar or password"
        except Exception as e:
            response_data = f"Error Occured: {e}"
            return HttpResponseBadRequest(response_data)
        return JsonResponse({"message": response_data})
    else :
        return HttpResponseBadRequest("Only accepts POST Requests!")

@csrf_exempt
def worker_logout(request):
    if request.method == 'GET':
        try:
            # if 'worker_id' in request.session:
            #     del request.session['worker_id']
            response_data = True
            return JsonResponse({"message": response_data})
        except Exception as e:
            return HttpResponseBadRequest("Cannot find worker in session data!")
    else :
        return HttpResponseBadRequest("Only accepts GET Requests!")

@csrf_exempt
def add_worker(request, wid, gid):
    if request.method == "PUT":
        try:
            grievance = Grievances.objects.get(id=gid)
            if grievance.stage == 2:
                worker = Worker.objects.get(id=wid)
                grievance.wid = worker
                grievance.stage += 1
                worker.status = "ASS"
                worker.save()
                grievance.save()
                if grievance.stage ==3:
                    message = f"Your grievance - {grievance.id} status has been updated!! Stage - Worker Assigned"
                response = requests.post(f"https://api.callmebot.com/whatsapp.php?phone=918445433348&text={message}&apikey=5958135")
                if response.status_code == 200:
                    print("POST request was successful.")
                    print("Response content:", response.text)
                else:
                    print("POST request failed with status code:", response.status_code)
                    print("Response content:", response.text)
                response_data = True
            else :
                return HttpResponseBadRequest("User not at appropriate stage!") 
        except Exception as e:
            response_data = f"Error Occured: {e}"
            return HttpResponseBadRequest(response_data)
        return JsonResponse({"message": response_data})
    else :
        return HttpResponseBadRequest("Only accepts PUT Requests!")

@csrf_exempt
def add_grievance(request, id):
    if request.method == "POST":
        try:
            user = User.objects.get(id=id)
            if user.access == "usr":
                grievance_data = json.loads(request.body)
                uid = user
                priority = grievance_data['priority']
                dept = grievance_data['dept']
                lat = grievance_data['lat']
                long = grievance_data['long']
                location = grievance_data['location']
                summary = grievance_data['summary']
                grievance = Grievances(uid=uid, priority=priority, dept=dept, lat=lat, long=long, location=location, summary=summary)
                grievance.save()
                response_data = True
            else :
                return HttpResponseBadRequest("Not an authorized operation!")
        except Exception as e:
            response_data = f"Error Occured: {e}"
            return HttpResponseBadRequest(response_data)
        return JsonResponse({"message": response_data})
    else :
        return HttpResponseBadRequest("Only accepts POST Requests!")

@csrf_exempt
def check_session(request):
    if request.method == "GET":
        try:
            # user_id = request.session.get('user_id')
            # if user_id is not None:
            #     response_data = user_id
            # else:
            #     response_data = False
            response_data = True
        except Exception as e:
            response_data = f"Error Occurred: {e}"
            return HttpResponseBadRequest(response_data)
        return JsonResponse({"message": response_data})
    else:
        return HttpResponseBadRequest("Only accepts GET Requests!")
    
    
@csrf_exempt
def check_wsession(request):
    if request.method=="GET":
        try:
            response_data = True
            # if 'worker_id' in request.session:
            #     response_data = True
        except Exception as e:
            response_data = f"Error Occured: {e}"
            return HttpResponseBadRequest(response_data)
        return JsonResponse({"message": response_data})
    else :
        return HttpResponseBadRequest("Only accepts GET Requests!")
    
def csrf_bhai(request):
    return render(request, 'index.html', {}) 