import sys
import subprocess
import io
import os

# Execute Python code using subprocess
def execute_python_code(code):
    try:
        print('Received Python code:\n', code)
        with open('/tmp/script.py', 'w') as py_file:
            py_file.write(code)

        run_result = subprocess.run(
            ['python3', '/tmp/script.py'], stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )

        print('Execution result:', run_result.returncode)
        return run_result.stdout.decode() if run_result.returncode == 0 else run_result.stderr.decode()
    except Exception as e:
        return str(e)

# Execute Java code
def execute_java_code(code):
    try:
        print('Received Java code:\n', code)
        with open('/tmp/Main.java', 'w') as java_file:
            java_file.write(code)

        compile_result = subprocess.run(
            ['javac', '/tmp/Main.java'], stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )
        if compile_result.returncode != 0:
            return compile_result.stderr.decode()

        run_result = subprocess.run(
            ['java', '-classpath', '/tmp', 'Main'], stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )
        return run_result.stdout.decode() if run_result.returncode == 0 else run_result.stderr.decode()
    except Exception as e:
        return str(e)

# Execute C++ code
def execute_cpp_code(code):
    try:
        print('Received C++ code:\n', code)
        with open('/tmp/main.cpp', 'w') as cpp_file:
            cpp_file.write(code)

        compile_result = subprocess.run(
            ['g++', '/tmp/main.cpp', '-o', '/tmp/main'], stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )
        if compile_result.returncode != 0:
            return compile_result.stderr.decode()

        run_result = subprocess.run(
            ['/tmp/main'], stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )
        return run_result.stdout.decode() if run_result.returncode == 0 else run_result.stderr.decode()
    except Exception as e:
        return str(e)


# Handler function to execute code based on language
def handler(event, context):
    language = event.get('language', 'python')
    code = event.get('code', '')

    if language == 'python':
        result = execute_python_code(code)
    elif language == 'java':
        result = execute_java_code(code)
    elif language == 'cpp':
        result = execute_cpp_code(code)
    else:
        result = f'Invalid language: {language}'

    return {
        'statusCode': 200,
        'body': result
    }
